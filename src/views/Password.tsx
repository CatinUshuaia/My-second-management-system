import Passwordreset from "@/components/Passwordreset"


export default function View() {
    return (
        <div className="user">
            <div className="home" style={{ fontSize: 30, textAlign: 'left', padding: 20, lineHeight: '48px', color: 'grey' }}>
                <p>Change password</p>
            </div>
            <Passwordreset  />
        </div>
    )
}
