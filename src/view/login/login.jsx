import React, { useEffect, useState } from 'react'
import LoginFrom from './component/LoginFrom'
import './login.scss'
import Leftimg from '../../images/login_left-1b40bd1b.png'
import RightLogin from '../../images/logo192.png'
// import {add} from "../../pkg/legoseq.js"
// import {add} from "react-wasm"

export default function Login() {

  const [result, setResult] = useState(0);


  return (
    <div className="loginMain">
      <div className="loginMain_1">
          <div className="loginLeft">
            <img src={Leftimg} alt="pic"/>
          </div>
          <div className="loginRIght">
            <div className="loginRIght_top">
              <img src={RightLogin} alt="" />
              <p>Hooks-Admin</p>
            </div>
            <LoginFrom />
          </div>
      </div>
    </div>
  )
}
 