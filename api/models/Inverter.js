module.exports = {
    attributes : {
        name : {
            type : 'string',
            required : true
        },
        company : {
            type : 'string',
            required : true
        },

        owner : {
            model : 'user'
        }
    }
}