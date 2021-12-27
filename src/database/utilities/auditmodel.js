const { DataTypes }  = require("sequelize");

/**
 * @typedef {Object} FullAutditEntity
 * @property {string} creatorUserId
 * @property {Date} creationTime
 * @property {string} updaterUserId
 * @property {Date} updationTime
 * @property {string} deleterUserId
 * @property {Date} deletionTime
 * @property {boolean} isDeleted
 */

const auditCreationEntity = {
    creatorUserId: {
        type: DataTypes.UUID,
        allowNull: true
    },
    creationTime: {
        type: DataTypes.DATE
    }
}

const auditUpdationEntity = {
    updaterUserId: {
        type: DataTypes.UUID,
        allowNull: true
    },
    updationTime: {
        type: DataTypes.DATE
    },
}

const auditDeletionEntity = {
    deleterUserId: {
        type: DataTypes.UUID,
        allowNull: true
    },
    deletionTime: {
        type: DataTypes.DATE
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}

const fullAuditEntity = {
    ...auditCreationEntity,
    ...auditUpdationEntity,
    ...auditDeletionEntity
}

module.exports = {
    auditCreationEntity,
    auditUpdationEntity,
    auditDeletionEntity,
    fullAuditEntity
}