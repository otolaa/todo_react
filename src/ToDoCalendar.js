import {useState, useReducer} from 'react'

function ToDoCalendar({idCal, dateTask}) {
    /* codepen.io/sergejkravchen2/pen/abVqxGv */
    const DaysOfWeek = ['Пн','Вт','Ср','Чт','Пт','Су','Вс'];
    const Months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    /* Устанавливаем текущий месяц, год */
    const d = new Date();
    const currMonth = d.getMonth();
    const currYear = d.getFullYear();
    const currDay = d.getDate();

    console.log(currMonth);
    console.log(currYear);
    console.log(currDay);

    /* Показать месяц (год, месяц) */
    const showMonth = (y, m) => {
        let d = new Date()
        // Первый день недели в выбранном месяце 
        , firstDayOfMonth = new Date(y, m, 7).getDay()
        // Последний день выбранного месяца
        , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
        // Последний день предыдущего месяца
        , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
        
        let days = [];
        let i = 1;
        do {
            let weekday = new Date(y, m, i).getDay();
            let dow = (weekday === 0?7:weekday);
            if (i === 1 && dow !== 1) {                
                let before_days = dow-1;
                for (let d = 1; d <= before_days; d++) { 
                    days.push({day:null, className:'not_current', weekday:null})
                }
            }

            /* дни текущего месяца */
            days.push({day:i, className:(currDay === i?'day_today':'day_normal'), weekday:dow})

            if (i === lastDateOfMonth && dow !== 7) {
                let after_days = 7-dow;
                for (let d = 1; d <= after_days; d++) {
                    days.push({day:null, className:'not_current', weekday:null})
                }
            }

            i++;

        } while(i <= lastDateOfMonth);

        return {
            months:`${Months[m]} ${y}`,
            daysArr:days,
        }
    }

    // array_chunk js
    const weekdayArr = []
    const arr_ = showMonth(currYear, currMonth);
    const chunkSize = 7;
    for (let i = 0; i <  arr_.daysArr.length; i += chunkSize) {
        const chunk_ = arr_.daysArr.slice(i, i + chunkSize);
        // do whatever
        weekdayArr.push(chunk_);
    }

    return (        
        <div key={`cl_${idCal}`} className="item-calendar">
            <table className="item-calendar__table" key={`tb_${idCal}`}>
                <thead>
                    <tr>
                        <td colSpan="7" key={`thead_td_${idCal}`}>
                            {arr_.months}
                        </td>
                    </tr>
                </thead>
                <tbody key={`tbody_${idCal}`}>
                    <tr className="item-calendar__table-days" key={`tbody_tr_${idCal}`}>
                        {DaysOfWeek.map((days, index)=>{
                            return <td key={`td_days_${index}_${idCal}`}>{days}</td>
                        })}
                    </tr>
                    {weekdayArr.map((week, i)=>{
                        return (
                            <tr key={`tr_${i}_${idCal}`}>
                                {week.map((days, id)=>{
                                    return <td key={`td_day_${id}_${idCal}`} className={days.className}>
                                        {days.day}
                                    </td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>        
    )
}

export  default ToDoCalendar