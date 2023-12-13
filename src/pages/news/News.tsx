import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./news.scss";

interface IPost {
    userId: number;
    id: number;
    title?: string;
    body?: string;
}

const News = () => {
    const [newsData, setNewsData] = useState<IPost[] | null>(null);

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await fetch("http://jsonplaceholder.typicode.com/posts?userId=1");
                const data = await response.json();
                console.log(data);
                setNewsData(data);
            } catch (error) {}
        };

        fetchNewsData();
    }, []);

    return (
        <div>
            <div className="title">News</div>
            <div className="posts-block">
                {newsData
                    ? newsData!.map((post) => {
                          return (
                              <div className="post" key={post.id}>
                                  {post.title}
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default News;
