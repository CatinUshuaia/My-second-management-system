import Step from "@/components/Step"
import Formstatus from "../components/Formstatus"


const View = () => {
    return (
        <div className="home">
            <Step />
            <Formstatus />
            <hr />
            <Step />
            <Formstatus />
            <hr />
            <Step />
            <Formstatus />
        </div>
    )
}

export default View