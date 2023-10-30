import Settings from "@/components/Settings"
import jwtDecode from "jwt-decode";
import { useState } from "react";

export default function View() {
    const [images, setImages] = useState<Image[]>([]);
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string, userName: string, UserType: number,staffCode:string } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    return (
        <div>
            <div className="home" style={{ fontSize: 30, textAlign: 'left', padding: 20, lineHeight: '48px', color: 'grey' }}>
                    <p>Settings</p>
            </div>
            <Settings userName={decodedToken ? decodedToken.userName : ''} staffCode={decodedToken ? decodedToken.staffCode : ''} images={images} setImages={setImages} />
        </div>
    )
}
