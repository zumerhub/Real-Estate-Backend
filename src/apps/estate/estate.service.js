const Estate = require("./estate.schema");


const createEsateService = async (data) => {
    const estate = await new Estate({
        ...data,
    })

    estate.save();

    return estate;
}

const findOneEsateService = async (filter) => {
    return await Estate.findOne(filter);
}


module.exports = { createEsateService, findOneEsateService };