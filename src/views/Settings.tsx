import Settings from "@/components/Settings"
import Avatarupload from "@/components/Avatarupload"

export default function View() {
    return (
        <div>
            <div className="home" style={{ fontSize: 30,  padding: 0, lineHeight: '48px', color: 'grey' }}>
                <p>Settings</p>
            </div>
            <Avatarupload  />
            <Settings  />
        </div>
    )
}
