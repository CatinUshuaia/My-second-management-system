﻿import { useDispatch, useSelector } from "react-redux"

const View = () => {
    const dispatch = useDispatch()
    //通过useSelector获取仓库数据
    const {num} = useSelector((state:RootState) => ({
        num:state.handleNum.num
    }))

    //修改仓库数据
    const changeNum = () => {
        //dispatch({type:"字符串，认为是一个记号",val:3}) type是固定的 val是自定义的
        dispatch({ type: "add2",val:10 })
    }

    const changeArr = () => {
        //dispatch({type:"字符串，认为是一个记号",val:3}) type是固定的 val是自定义的
        dispatch({ type: "sarrpush", val: 10 })
    }

    //对sarr的操作

    return (
        <div className="home" style={{ fontSize:30,textAlign: 'center', padding: 0, lineHeight: '48px',color:'blue' }} >
            <p>这是Formsubmit页面</p>
            <p>请在这里提交你的表格</p>
            <p>{num}</p>
            <button onClick={changeNum}>按钮</button>
            <div>
                <button onClick={changeArr}>按钮</button>
            </div>
        </div>
    )
}

export default View