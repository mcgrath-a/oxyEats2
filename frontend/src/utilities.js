export const getFoodNames = (favorites) => favorites.map(favorite => favorite.name)

export const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
};

export const getRatingsObj = (ratings) => {
    let arr = {}; 

    ratings.map(rating => {
        arr = {...arr, [rating.name]: rating.rating}
    })
    return arr
}

export const getRatingsInArray = (ratings) => {
    let arr = []
    Object.keys(ratings).map((foodName, foodIndex) => (
        arr.push({ sNo: foodIndex+1, foodName: foodName, rating: ratings[foodName] })
        ));
    return arr
}

export const getCleanText = (text) => {
    const replaceCond = {
        "&nbsp;": " ",
        "&amp;": "&"  
    };

    // Iterate over the keys of replaceCond and apply the replacements
    Object.keys(replaceCond).forEach((replaceCondKey) => {
        text = text.replace(new RegExp(replaceCondKey), replaceCond[replaceCondKey]);
    });

    return text;
};

export const completeDate = (dateString) => {
    const [hours, minutes] = dateString.split(":");
    const date = new Date();  // Today’s date
    date.setHours(hours, minutes, 0, 0);  // Set hours and minutes from the input value
    return date
}

export const getHHMM = (input) => {
    let date;

    // Check if input is a timestamp (numeric string)
    if (!isNaN(input)) {
        // Convert timestamp string to a number and then to Date
        date = new Date(Number(input));
    } else {
        // Parse date string directly into a Date object
        date = new Date(input);
    }

    // Format hours and minutes as HH:MM
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
}

export const getHH = (input) => {
    let date;

    // Check if input is a timestamp (numeric string)
    if (!isNaN(input)) {
        // Convert timestamp string to a number and then to Date
        date = new Date(Number(input));
    } else {
        // Parse date string directly into a Date object
        date = new Date(input);
    }

    // Format hours and minutes as HH:MM
    const hours = String(date.getHours()).padStart(2, '0');

    return hours;
}

export const getMM = (input) => {
    let date;

    // Check if input is a timestamp (numeric string)
    if (!isNaN(input)) {
        // Convert timestamp string to a number and then to Date
        date = new Date(Number(input));
    } else {
        // Parse date string directly into a Date object
        date = new Date(input);
    }

    const minutes = String(date.getMinutes()).padStart(2, '0');

    return minutes;
}