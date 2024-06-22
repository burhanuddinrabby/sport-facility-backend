import { TBooking } from "./bookings.interface";

//date string in the format YYYY-MM-DD || 0000-00-00
export const makeDateString = (date: Date) => {
    let dateString: string = "";
    dateString += date.getFullYear() + "-";
    dateString += (date.getMonth() + 1).toString().padStart(2, '0') + "-";
    dateString += date.getDate().toString().padStart(2, '0');
    return dateString;
}
//Array or probable start and end time
export const startTime = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
export const endTime = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];


//Get available slots
//note: Get the idea of this function from ai + my own idea and refactored it by myself
export const getAvailableSlots = (startTime : string[], endTime: string[], bookedSlots: Partial<TBooking>[]) => {
    // time to minute
    function timeToMinutes(time : string) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    // minute in HH:MM format
    function minutesToTime(minutes : number) {
        const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
        const mins = String(minutes % 60).padStart(2, '0');
        return `${hours}:${mins}`;
    }

    // probable booked slots in a day
    const mergedSlots:{
        start:number,
        end:number
    }[] = [];
    bookedSlots.forEach(slot => {
        mergedSlots.push({
            start: timeToMinutes(slot.startTime as string),
            end: timeToMinutes(slot.endTime as string)
        });
    });

    // Sort slots by start time
    mergedSlots.sort((a, b) => a.start - b.start);

    // Find available slots
    const availableSlots: {
        startTime: string,
        endTime: string
    }[] = [];
    let previousEnd = 0;

    mergedSlots.forEach(slot => {
        if (previousEnd < slot.start) {
            availableSlots.push({
                startTime: minutesToTime(previousEnd ),
                endTime: minutesToTime(slot.start)
            });
        }
        previousEnd = slot.end;
    });

    // if there is a slot between the last booked slot and the end of the day
    // 24hr = 1440 minutes
    if (previousEnd < 1440) {
        availableSlots.push({
            startTime: minutesToTime(previousEnd),
            endTime: minutesToTime(1440)
        });
    }

    // available slots into 2-hour format
    const splitSlots: {
        startTime: string,
        endTime: string
    }[] = [];
    availableSlots.forEach(slot => {
        let start = timeToMinutes(slot.startTime);
        const end = timeToMinutes(slot.endTime);
        while (start < end) {
            const nextEnd = Math.min(start + 120, end);
            splitSlots.push({
                startTime: minutesToTime(start),
                endTime: minutesToTime(nextEnd)
            });
            start = nextEnd;
        }
    });

    // Filter out slots that overlap with booked slots
    const filteredSlots = splitSlots.filter(slot => {
        const slotStart = timeToMinutes(slot.startTime);
        const slotEnd = timeToMinutes(slot.endTime);
        return !mergedSlots.some(booked => slotStart < booked.end && slotEnd > booked.start);
    });

    return filteredSlots;
}