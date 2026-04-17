import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  ActivityIndicator, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  ChevronLeft, 
  Check,
  Save
} from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import { LinearGradient } from 'expo-linear-gradient';

export default function EditProfileScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    dob: '', // Placeholder as we don't have it in user_metadata by default
    location: '',
    address: ''
  });

  const handleSave = async () => {
    if (!user) return;
    if (!form.full_name) {
      Alert.alert('Required', 'Please enter your full name');
      return;
    }

    setLoading(true);
    try {
      const res = await api.updateProfile({
        userId: user.id,
        ...form
      });
      if (res.success) {
        Alert.alert('Success', 'Pranam! Your spiritual profile has been updated.', [
          { text: 'Dhanyawad', onPress: () => router.back() }
        ]);
      }
    } catch (error: any) {
      Alert.alert('Update Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, icon: Icon, value, onChangeText, placeholder, keyboardType = 'default' }: any) => (
    <View className="mb-6">
      <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">{label}</Text>
      <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
        <Icon size={18} color="#94A3B8" />
        <TextInput
          className="flex-1 ml-3 text-gray-900 font-bold text-sm"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#CBD5E1"
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
        {value.length > 2 && <Check size={16} color="#22C55E" />}
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <LinearGradient colors={['#FFF5F0', '#FFFFFF']} className="px-6 pt-16 pb-8">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
          >
            <ChevronLeft size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text className="text-gray-900 font-black text-lg">Pratima Edit</Text>
          <View className="w-10" />
        </View>

        <View className="mt-8 items-center">
            <View className="relative">
                <View className="w-24 h-24 bg-primary/10 rounded-[32px] items-center justify-center border-4 border-white shadow-xl">
                    <User size={48} color="#FF4D00" />
                </View>
                <TouchableOpacity className="absolute -bottom-2 -right-2 bg-primary w-8 h-8 rounded-full items-center justify-center border-2 border-white">
                    <Save size={14} color="white" />
                </TouchableOpacity>
            </View>
            <Text className="mt-4 text-gray-400 font-bold text-xs uppercase tracking-widest">Divine Identity</Text>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6 pb-12">
          <View className="mt-4">
            <InputField 
              label="Full Name" 
              icon={User} 
              value={form.full_name}
              onChangeText={(text: string) => setForm({...form, full_name: text})}
              placeholder="Enter your name"
            />
            
            <InputField 
              label="Email Address" 
              icon={Mail} 
              value={form.email}
              onChangeText={(text: string) => setForm({...form, email: text})}
              placeholder="email@example.com"
              keyboardType="email-address"
            />

            <InputField 
              label="Date of Birth" 
              icon={Calendar} 
              value={form.dob}
              onChangeText={(text: string) => setForm({...form, dob: text})}
              placeholder="DD/MM/YYYY"
            />

            <InputField 
              label="Location / City" 
              icon={MapPin} 
              value={form.location}
              onChangeText={(text: string) => setForm({...form, location: text})}
              placeholder="e.g. Varanasi, UP"
            />

            <View className="mb-6">
              <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Address & House No.</Text>
              <View className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 min-h-[100px]">
                <TextInput
                  className="text-gray-900 font-bold text-sm"
                  value={form.address}
                  onChangeText={(text: string) => setForm({...form, address: text})}
                  placeholder="Enter full address for puja prasad delivery"
                  placeholderTextColor="#CBD5E1"
                  multiline
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity 
            onPress={handleSave}
            disabled={loading}
            className={`w-full h-16 rounded-3xl items-center justify-center shadow-lg mb-10 ${loading ? 'bg-gray-300' : 'bg-primary shadow-primary/30'}`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <View className="flex-row items-center">
                <Save size={20} color="white" />
                <Text className="text-white text-lg font-black ml-2 uppercase tracking-widest">Naveenikaran (Save)</Text>
              </View>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
