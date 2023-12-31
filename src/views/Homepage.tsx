﻿import { useDispatch, useSelector } from "react-redux"
import numStatus from "@/store/NumStatus"
import Homebuttons from "@/components/Homebuttons"
import jwtDecode from "jwt-decode"




const View = () => {
    const dispatch = useDispatch()
    //通过useSelector获取仓库数据
    //const {num} = useSelector((state:RootState) => ({
    //    num:state.handleNum.num
    //}))

    ////修改仓库数据
    //const changeNum = () => {
    //    dispatch(numStatus.asyncActions.asyncAdd1 as any)

    //}

    //const changeArr = () => {
    //    dispatch({ type: "sarrpush", val: 10 })
    //}


    //对sarr的操作+

    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { userName: string } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    return (
        <div>   
            <div className="home" style={{ fontSize: 30, padding:20,lineHeight: '48px', color: 'grey' }}>
                <p>Welcome, {decodedToken?decodedToken.userName:"Sir/Madam"}</p>
            </div>
            <div className="homebuttons" >
                <Homebuttons  />
            </div>
            {/*<p>这是Formsubmit页面</p>*/}
            {/*<p>请在这里提交你的表格</p>*/}
            {/*<p>{num}</p>*/}
            {/*<button onClick={changeNum}>异步操作按钮</button>*/}
            {/*<div>*/}
            {/*<button onClick={changeArr}>同步操作按钮</button>*/}
            {/*</div>*/}
        </div>
    )
}

export default View