import './Rooms.scss';


const Rooms = () => {

    const rooms = [
        {
            name: 'Стандарт корпус',
            image: './upload/rooms/standart.jpg',
            link: ''
        },
        {
            name: 'Vip-корпус',
            image: './upload/rooms/vip.jpg',
            link: ''
        },
        {
            name: 'Бунгало',
            image: './upload/rooms/bungalo.jpg',
            link: ''
        }
    ]



    return (
        <div className="rooms-container">
            <div className="rooms-title">
                <p>Виды номеров</p>
            </div>
            <div className="rooms-block">
                {rooms.map((room, index) => (
                    <div className="rooms-item" key={index}>
                        <a href={room.link}>
                            <div className="room-image">
                                <img src={room.image} />
                            </div>
                            <div className="room-name">
                                <p>{room.name}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Rooms;