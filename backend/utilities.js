const getCleanText = (text) => {
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

module.exports = getCleanText;