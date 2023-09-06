import { useDispatch, useSelector } from "react-redux"
import numStatus from "@/store/NumStatus"
import Submitform from "@/components/Submitform"
  

const View = () => {
    const dispatch = useDispatch()
    //通过useSelector获取仓库数据
    //const { num } = useSelector((state: RootState) => ({
    //    num: state.handleNum.num
    //}))

    ////修改仓库数据
    //const changeNum = () => {
    //    dispatch(numStatus.asyncActions.asyncAdd1)

    //}

    //const changeArr = () => {
    //    dispatch({ type: "sarrpush", val: 10 })
    //}


    //对sarr的操作

    return (
        <div>
            <div className="home" style={{ fontSize: 30, textAlign: 'left', padding: 10, lineHeight: '48px', color: 'grey' }}>
                <p>Form Submission</p>
            </div>
            <div>
                <Submitform />
            </div>
            {/*<p>这是Formsubmit页面</p>*/}
            {/*<p>请在这里提交你的表格</p>*/}
            {/*<p>{num}</p>*/}
            {/*<button onClick={changeNum}>异步操作按钮</button>*/}
            {/*<div>*/}
            {/*    <button onClick={changeArr}>同步操作按钮</button>*/}
            {/*</div>*/}

        </div>
    )
}

export default View