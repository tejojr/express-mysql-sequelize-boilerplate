require('dotenv').config()
const models = require('../models')

const sQuery = require('sequelice-query')

const { User, Sequelize } = models

async function getUserSpecial({ req, ResponseError }) {
    const condition = await sQuery.generate({
        req,
        model: User,
        configs: {
            optFilter: {
                transformValueByKey: {
                    name: args => {
                        const { value } = args
                        if (value === '1') {
                            return {
                                [Sequelize.Op.eq]: 'Ammar',
                            }
                        }
                        return value
                    },
                },
            },
        },
    })

    const { include, queryFilter: where, querySort: order } = condition

    const data = await User.findAll({
        include,
        where,
        order,
    })

    const totalRow = await User.count({
        include: condition.includeCount,
        where,
    })
    return { data, totalRow }
}
module.exports = {
    getUserSpecial,
}
