var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0';
export default function fetchTimestampsWithAPI() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const idData = yield axios.get(`${HN_API_BASE}/newstories.json?print=pretty`);
            const storyPromises = idData.data.slice(0, 100).map((id) => axios.get(`${HN_API_BASE}/item/${id}.json?print=pretty`));
            const stories = yield Promise.all(storyPromises);
            const timeStamps = stories.map(story => story.data.time);
            return timeStamps;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
