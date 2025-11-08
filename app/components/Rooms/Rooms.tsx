import BlockTitle from '../BlockTitle/BlockTitle';
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
            <BlockTitle>Виды номеров</BlockTitle>
            <div className="rooms-block">
                {rooms.map((room, index) => (
                    <div className="rooms-item" key={index}>
                        <a href={room.link}>
                            <div className="room-image">
                                <img src={room.image} />
                            </div>
                            <div className="room-name-block">
                                <p className='room-name'>
                                    {room.name}
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 0L7.41375 1.58625L13.6912 7.875H0V10.125H13.6912L7.41375 16.4137L9 18L18 9L9 0Z" fill="#2D7B9E"/>
                                    </svg>
                                </p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Rooms;