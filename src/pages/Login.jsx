import SignTitle from '@c/SignInUp/SignTitle';
import SignInput from '@c/SignInUp/SignInput';
import SignButton from '@c/SignInUp/SignButton';
import {useEffect, useState} from 'react'
import PocketBase from 'pocketbase';
import { resetWarningCache } from 'prop-types';


import read from '@u/readPocketHost'
import create from '@u/createPocketHost'
// import { read, create } from '@u'

async function getIds(pb) {  
  const users = await pb.collection('users').getList(1, 99)
  const ids = users.items.map(item => item.username);
  return ids;
  // console.log(users)
  // console.log(ids)
}
async function getPw(users, id) {  
  const user = users.items.find(item => item.username === id);
  console.log(user.username);
  return user.password;
  // console.log(users)
  // console.log(ids)
}

function getInput(){
  
}

async function isUser(pb, login) {
  await pb.collection('users').authWithPassword(
    login[0],
    login[1],
    );
  }
  
async function fields() {
    const pb = new PocketBase('https://lionplace-db.pockethost.io/');
    
    const userData = await pb.collection('reviews').getList(1,99, {fields: 'id'})
    // const usersData = await pb.collection('reviews').getList(1, 99,
    //   {
    //     expand: 'writer, place'
    //   })
    console.log(userData)
    // const users = usersData.items[0];
    // console.log(users)
}




function Login() {
  const newReview = {
    contents: "하하하",
    place: "9tzpin4vcxve50m",
    writer: "qdrp8uygpcseps3"
  }
  return (
    <>
      <SignTitle value="로그인" />

      <SignInput 
        labelValue="아이디" 
        ariaText="아이디 입력창" 
        placeHolder="아이디를 입력하세요" 
      />

      <SignInput 
        labelValue="비밀번호" 
        ariaText="비밀번호 입력창" 
        placeHolder="비밀번호를 입력하세요"
      />
      
      <SignButton value='read' handleEvent={()=>read('reviews')} /> 
      <br/>
      <SignButton value='create' handleEvent={()=>create('reviews', newReview)} /> 
      <br/>
      {/* <SignButton value='expand' handleEvent={useFetchData} />  */}
    </>
  );
}

export default Login;
