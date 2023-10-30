import Approvement from "../components/FormsinTeam"

export default function View() {
    return (
        <div className="user">
            <div className="home" style={{ fontSize: 30, textAlign: 'left', padding: 20, lineHeight: '48px', color: 'grey' }}>
                <p>Forms</p>
            </div>
            <Approvement  />
        </div>
    )
}
