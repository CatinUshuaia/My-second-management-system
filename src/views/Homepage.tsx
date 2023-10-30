import Homebuttons from "@/components/Homebuttons"
import jwtDecode from "jwt-decode"




const View = () => {
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
        </div>
    )
}

export default View