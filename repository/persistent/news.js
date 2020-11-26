const _ = require('lodash');

const newsModel = require('../../models/news');

class News {
    findNewsBySourceAndPubDate({ source, pubDate, limit, skip }) {
        const query = {};

        if (source) {
            query.source = source;
        }
        if (pubDate) {
            query.pubDate = { $gt: pubDate };
        }

        return newsModel.find(query)
            .sort({ pubDate: -1 }) // sorted latest
            .skip(skip) // Always apply 'skip' before 'limit'
            .limit(limit) // 'page size'
            .lean();
    }

    findNewsByNewsId({ newsIds }) {
        const query = { _id: newsIds };

        return newsModel.find(query)
            .sort({ pubDate: -1 }) // sorted latest
            .lean();
    }

    async findNewsIdByLink({ link }) {
        const news = await newsModel.findOne({ link }, { _id: 1 }).lean();
        const newsId = news ? news._id.toString() : '';

        return newsId;
    }

    getCountNewsBySourceAndPubDate({ source, pubDate }) {
        const query = {};
        if (source) {
            query.source = source;
        }
        if (pubDate) {
            query.pubDate = { $gt: pubDate };
        }

        return newsModel.countDocuments(query);
    }

    async bulkWrite({ items }) {
        if (!items.length) {
            return [];
        }

        const bulkWrite = items.map((item) => (
            { updateOne: { // When same link is found, update the doc.
                filter: { link: item.link },
                update: item,
                upsert: true,
            } }
        ));

        const writeResult = await newsModel.bulkWrite(bulkWrite);
        const insertedIds = _.get(writeResult, 'result.upserted') || [];
        const itemsWithNewsId = items;

        insertedIds.forEach((item) => {
            itemsWithNewsId[item.index].newsId = item._id.toString();
        });

        return itemsWithNewsId;
    }
}

module.exports = new News();
