import React from 'react';
import { StyleSheet, Image, Text, TextInput,Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

export default function Signup() {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const onValid = (data) => {

  }
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/common/logo-white.png')}
        style={styles.logo}
      />
      <Text style={styles.membertext}>로그인</Text>
      <View style={styles.inputcover}>
        <View style={styles.input}>
          <Text style={styles.inputtitle}>이메일</Text>
          <TextInput style={styles.inputtext} placeholderTextColor="#AEAEAE" placeholder='이메일을 입력해주세요.'{...register("email",{
            required:"이메일은 필수 입력 사항입니다.",
          })}></TextInput>
          <View style={styles.inputline} />
        </View>
        <View style={styles.input}>
          <Text style={styles.inputtitle}>비밀번호</Text>
          <TextInput style={styles.inputtext} placeholderTextColor="#AEAEAE" placeholder='비밀번호를 입력해주세요.' secureTextEntry={true} {...register("pw",{
            required:"비밀번호는 필수 입력 사항입니다.",
          })}></TextInput>
          <View style={styles.inputline} />
        </View>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttontext}>로그인</Text>
      </Pressable>
      <View style={styles.dologincover}>
      <Text style={styles.isaddress}>계정이 없으신가요?</Text>
      <Text style={styles.dologin}>회원가입</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100, 
    height: 100,
    marginBottom: 60,
    resizeMode: 'contain',
  },
  membertext: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 32,
  },
  inputcover: {
    width: '75%',
    padding: 10,
    marginBottom: 30,
  },
  inputtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6F6D6D',
    marginBottom: 8,
  },
  inputtext: {
    width: '100%',
    minHeight: 40,
    color: "#000",
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 8,
  },
  inputline: {
    width: '100%',
    height: 1,
    backgroundColor: '#AEAEAE',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
  },
  button:{
    width:293,
    height:52,
    marginBottom:12,
    backgroundColor:'#5AAAEF',
    borderRadius:12,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  buttontext:{
    fontSize:20,
    fontWeight:'600',
    color:'#FFFFFF',
  },
  dologincover:{
    display:'flex',
    flexDirection:'row',
    gap:4,
    marginLeft:75,
  },
  isaddress:{
    fontSize:16,
    fontWeight:'500',
    color:'#AEAEAE',
  },
  dologin:{
    fontSize:16,
    fontWeight:'600',
    color:'#5AAAEF',
  },
  errorText:{
    color:'red',
    fontSize:14,
  },
});