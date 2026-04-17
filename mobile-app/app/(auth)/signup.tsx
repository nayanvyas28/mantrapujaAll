import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Link, useRouter } from 'expo-router';
import { UserPlus, Mail, Lock, User, Loader2 } from 'lucide-react-native';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signUpWithEmail() {
    setLoading(true);
    const { 
      data: { session },
      error 
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) Alert.alert('Error', error.message);
    else if (!session) Alert.alert('Check your email for the confirmation link!');
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-8 pt-20">
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-4">
              <UserPlus size={40} color="#FF4D00" />
            </View>
            <Text className="text-3xl font-bold text-gray-900">Create Account</Text>
            <Text className="text-gray-500 mt-2">Start your spiritual journey today</Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Full Name</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-1 h-14">
                <User size={20} color="#9CA3AF" />
                <TextInput
                  className="flex-1 ml-3 text-gray-900"
                  onChangeText={setFullName}
                  value={fullName}
                  placeholder="John Doe"
                />
              </View>
            </View>

            <View className="mt-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">Email Address</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-1 h-14">
                <Mail size={20} color="#9CA3AF" />
                <TextInput
                  className="flex-1 ml-3 text-gray-900"
                  onChangeText={setEmail}
                  value={email}
                  placeholder="name@example.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View className="mt-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-1 h-14">
                <Lock size={20} color="#9CA3AF" />
                <TextInput
                  className="flex-1 ml-3 text-gray-900"
                  onChangeText={setPassword}
                  value={password}
                  placeholder="••••••••"
                  secureTextEntry={true}
                />
              </View>
            </View>

            <TouchableOpacity 
              onPress={signUpWithEmail}
              disabled={loading}
              className="bg-primary h-14 rounded-2xl items-center justify-center mt-8 shadow-lg shadow-primary/20"
            >
              {loading ? (
                <Loader2 size={24} color="#FFF" className="animate-spin" />
              ) : (
                <Text className="text-white text-lg font-bold">Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-auto mb-10">
            <Text className="text-gray-600">Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text className="text-primary font-bold">Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
