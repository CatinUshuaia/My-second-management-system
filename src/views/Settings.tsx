import Settings from "@/components/Settings"
import Avatarupload from "@/components/Avatarupload"

export default function View() {
    return (
        <div>
            <div className="home" style={{ fontSize: 30, textAlign: 'left', padding: 10, lineHeight: '48px', color: 'grey' }}>
                <p>Settings</p>
            </div>
            <Avatarupload  />
            <Settings  />
        </div>
    )
}
