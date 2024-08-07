import React, { useState, useEffect } from 'react';
import HandleReserve from './HandleReserve';

const DateTimeDropdown = ({ reserveGame, rooms, idGame }) => {
  const [dateOption, setDateOption] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [timeOption, setTimeOption] = useState([])
  const [selectedTime, setSelectedTime] = useState('')
  const [roomOptions, setRoomOptions] = useState([])
  const [selectedRoom, setSelectedRoom] = useState('')

  const generateDateOptions = () => {
    const options = [];
    const now = new Date();

    for (let day = 1; day <= 7; day++) {
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + day);
      options.push(date);
    }

    return options;
  };

  const generateTimeOptions = () => {
    const options = [];

    for (let hour = 11; hour <= 20; hour++) {
      const time = new Date();
      time.setHours(hour, 0, 0, 0); // Set the hour and reset minutes, seconds, and milliseconds
      options.push(time);
    }

    return options;
  };


  useEffect(() => {
    console.log(rooms)
    const dateOptions = generateDateOptions()
    setDateOption(dateOptions)
  }, [reserveGame])


  useEffect(() => {
    if (selectedDate) {
      const timeOptions = generateTimeOptions()
      const date = new Date(selectedDate)

      const filtered = timeOptions.filter(time => {
        const check = reserveGame.map(reservation => {
          const [resDate, resTime] = reservation.split('T')
          const isoTime = new Date(resDate)
          // console.log(resTime.slice(0,2)+"=="+time.getHours())
          // console.log(isoTime.getDate()+" == "+ date.getDate())
          if (isoTime.getFullYear() == date.getFullYear()
            && isoTime.getMonth() == date.getMonth()
            && isoTime.getDate() == date.getDate()
            && resTime.slice(0, 2) == time.getHours()) {
            console.log("bla")
            return true
          } else {
            return false
          }
        })
        return !check.includes(true)
      })
      setTimeOption(filtered)
    }
  }, [selectedDate, reserveGame])

  useEffect(() => {
    const date = new Date(selectedDate);
    const hr = selectedTime.slice(0, 2);
    const filtered = rooms.filter(room => {
      if (room.reservation.length > 0) {
        return !room.reservation.some(reserve => {
          const resYear = parseInt(reserve.slice(0, 4));
          const resMonth = parseInt(reserve.slice(5, 7));
          const resDate = parseInt(reserve.slice(8, 10));
          const resHour = reserve.slice(11, 13);

          if (
            date.getFullYear() == resYear &&
            (date.getMonth() + 1) == resMonth &&
            date.getDate() == resDate &&
            hr == resHour
          ) {
            console.log('heheh');
            return true
          }
          return false
        });
      }
      return true
    })
    setRoomOptions(filtered)

  }, [selectedTime])
  useEffect(() => {
    const a = new Date(selectedDate)
    a.setHours(selectedTime.slice(0, 2), 0, 0)
    console.log(a)
    console.log(selectedRoom)
  }, [selectedRoom])
  return (
    <div className='dropdown'>
      <div className='selecttime'>
        <label htmlFor='date'>select date -{'>'} </label>
        <select id="date" onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate}>
          <option value=''>---select date---</option>
          {dateOption.map((date, i) => {
            return (
              <option key={i} value={date.toDateString()}>
                {date.toDateString()}
              </option>
            )
          })}
        </select>
      </div>
      {!!selectedDate && <div className='selectday'>
        <label htmlFor="time">select time -{'>'} </label>
        <select id="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
          <option value="">---select time---</option>
          {timeOption.map((time, i) => {
            return (
              <option value={time.toTimeString()} key={i}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </option>
            )
          })}
        </select>
      </div>}
      {!!selectedTime && (roomOptions.length > 0 ? <div className='selectroom'>
        <label htmlFor='room'>select room -{'>'}</label>
        <select id='room' value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
          <option value=''>---select room---</option>
          {roomOptions.map(room => {
            return (
              <option value={room._id} key={room.roomName}>
                {room.roomName}
              </option>
            )
          })}
        </select>
      </div> :
        <div>no room available</div>
      )}
      {!!selectedRoom && <div>
        <HandleReserve date={selectedDate} time={selectedTime} room={selectedRoom} idGame={idGame} />
      </div>}
    </div>
  )

};

export default DateTimeDropdown;
