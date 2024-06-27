import axios from 'axios';

const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0';

export default async function fetchTimestampsWithAPI() {  
    try {
        const idData = await axios.get(`${HN_API_BASE}/newstories.json?print=pretty`);
    
        const storyPromises = idData.data.slice(0, 100).map((id: number) => 
            axios.get(`${HN_API_BASE}/item/${id}.json?print=pretty`)
        );
    
        const stories = await Promise.all(storyPromises);
        const timeStamps = stories.map(story => story.data.time);
        return timeStamps;

    } catch (error) {
        console.error(error);
        return [];
    }
}
