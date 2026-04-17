import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions,
  Image
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { 
  ChevronLeft, 
  ShieldCheck, 
  Info, 
  ExternalLink,
  MapPin,
  Mail,
  Phone
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function LegalScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState<'about' | 'policy'>( (params.tab as any) || 'about');

    useEffect(() => {
        if (params.tab) {
            setActiveTab(params.tab as any);
        }
    }, [params.tab]);

    const PolicySection = ({ title, content }: any) => (
        <View className="mb-8">
            <Text className="text-gray-900 font-black text-lg mb-2">{title}</Text>
            <Text className="text-gray-500 leading-6 text-sm">{content}</Text>
        </View>
    );

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <LinearGradient colors={['#FFF5F0', '#FFFFFF']} className="px-6 pt-16 pb-8">
                <View className="flex-row items-center justify-between mb-8">
                    <TouchableOpacity 
                        onPress={() => router.back()}
                        className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
                    >
                        <ChevronLeft size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <Text className="text-gray-900 font-black text-lg">Mantra Information</Text>
                    <View className="w-10" />
                </View>

                {/* Tabs */}
                <View className="flex-row bg-gray-100 p-1.5 rounded-3xl">
                    <TouchableOpacity 
                        onPress={() => setActiveTab('about')}
                        className={`flex-1 py-3 items-center rounded-2xl flex-row justify-center ${activeTab === 'about' ? 'bg-white shadow-sm' : ''}`}
                    >
                        <Info size={16} color={activeTab === 'about' ? '#FF4D00' : '#94A3B8'} />
                        <Text className={`ml-2 font-bold text-xs uppercase ${activeTab === 'about' ? 'text-gray-900' : 'text-gray-400'}`}>About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setActiveTab('policy')}
                        className={`flex-1 py-3 items-center rounded-2xl flex-row justify-center ${activeTab === 'policy' ? 'bg-white shadow-sm' : ''}`}
                    >
                        <ShieldCheck size={16} color={activeTab === 'policy' ? '#FF4D00' : '#94A3B8'} />
                        <Text className={`ml-2 font-bold text-xs uppercase ${activeTab === 'policy' ? 'text-gray-900' : 'text-gray-400'}`}>Policies</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
                {activeTab === 'about' ? (
                    <View className="pb-20">
                        <View className="items-center mb-10">
                            <Image 
                                source={require('../../assets/images/logo.png')} 
                                className="w-24 h-24 rounded-3xl"
                                resizeMode="contain"
                            />
                            <Text className="mt-4 text-3xl font-black text-gray-900">Mantra Puja</Text>
                            <Text className="text-primary font-bold uppercase tracking-[3px] text-[10px] mt-1">Divine Connection</Text>
                        </View>

                        <Text className="text-gray-500 leading-7 text-base mb-8 text-center px-4">
                            Mantra Puja was born with a mission to bring the ancient divine rituals of Bharat closer to every bhakt, regardless of their location. We combine spiritual authenticity with modern technology to provide seamless access to Pujas, Astrology, and Sacred Melodies.
                        </Text>

                        <View className="bg-orange-50 p-8 rounded-[40px] border border-orange-100 mb-8">
                            <Text className="text-primary font-black text-xl mb-4 text-center">Our Vision</Text>
                            <Text className="text-gray-600 leading-6 text-sm text-center italic">
                                "To be the digital bridge that connects millions of souls to their spiritual roots, ensuring the sanctity and purity of every ritual performed."
                            </Text>
                        </View>

                        <View className="space-y-6">
                            <View className="flex-row items-center bg-gray-50 p-4 rounded-3xl border border-gray-100">
                                <View className="w-10 h-10 bg-white rounded-xl items-center justify-center mr-4">
                                    <MapPin size={20} color="#FF4D00" />
                                </View>
                                <View>
                                    <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Office Address</Text>
                                    <Text className="text-gray-900 font-bold text-sm">Varanasi, Uttar Pradesh, India</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center bg-gray-50 p-4 rounded-3xl border border-gray-100">
                                <View className="w-10 h-10 bg-white rounded-xl items-center justify-center mr-4">
                                    <Mail size={20} color="#FF4D00" />
                                </View>
                                <View>
                                    <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Support Email</Text>
                                    <Text className="text-gray-900 font-bold text-sm">bhakti@mantrapuja.com</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center bg-gray-50 p-4 rounded-3xl border border-gray-100">
                                <View className="w-10 h-10 bg-white rounded-xl items-center justify-center mr-4">
                                    <Phone size={20} color="#FF4D00" />
                                </View>
                                <View>
                                    <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Technical Helpline</Text>
                                    <Text className="text-gray-900 font-bold text-sm">+91 99999 00000</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity className="mt-12 flex-row items-center justify-center border border-gray-100 py-4 rounded-2xl">
                            <Text className="text-gray-500 font-bold mr-2">Visit mantrapuja.com</Text>
                            <ExternalLink size={16} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View className="pb-20">
                        <PolicySection 
                            title="1. Acceptance of Terms" 
                            content="By accessing and using Mantra Puja, you agree to be bound by these terms. Our services include puja bookings, astrology consultations, and spiritual music streaming."
                        />
                        <PolicySection 
                            title="2. Privacy Policy" 
                            content="Your spiritual privacy is sacred to us. We collect minimal data (Name, Phone, Birth details) solely to personalize your experience and facilitate accurate rituals."
                        />
                        <PolicySection 
                            title="3. Refund & Cancellation" 
                            content="Pujas can be cancelled up to 24 hours before the scheduled time for a full Divine Wallet credit. Refunds to original payment methods may take 5-7 working days."
                        />
                        <PolicySection 
                            title="4. Data Security" 
                            content="All sensitive information, including payment data and kundli details, is encrypted using industry-standard protocols to ensure total divine security."
                        />
                        
                        <View className="bg-gray-50 p-6 rounded-3xl border-l-4 border-primary mt-4">
                            <Text className="text-gray-500 italic text-xs leading-5">
                                Note: These terms are subject to change to better serve our devotee community. Effective from April 2026.
                            </Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
