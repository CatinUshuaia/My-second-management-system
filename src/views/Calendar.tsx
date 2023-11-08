import Calendar from "@/components/Calendar"

export default function View() {
    return (
        <div className="user">
            <div className="home">
                <p>Calendar</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px' }}>
                <div style={{ border: '12px solid #ccc', borderRadius: '32px', padding: '10px', margin: '-20px' }}>
                    <Calendar />
                </div>
            </div>
        </div>
    )
}