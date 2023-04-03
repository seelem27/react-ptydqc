import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

const Page = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      const data = await fetch(
        'https://my-json-server.typicode.com/savayer/demo/posts'
      );
      let json = await data.json();

      let newArr = [];

      json.forEach((item) => {
        let newData = {};

        newData.id = item.id;
        newData.title = item.title;
        newData.link_title = item.link_title;
        newData.link = item.link;
        newData.text = item.body?.en.substr(0, 50) + '...';

        newArr.push(newData);
      });

      if (isSubscribed) {
        setCards(newArr);
      }
    };

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }

    return () => (isSubscribed = false);
  }, []);

  function analyticsTrackClick(url) {
    // sending clicked link url to analytics
    console.log(url);
  }

  return (
    <div>
      {cards.map((item) => {
        return (
          <Card
            key={item.id}
            title={item.title.en}
            linkTitle={item.link_title}
            href={item.link}
            text={item.text}
            linkClassName={item.id === 1 ? 'card__link--red' : ''}
            target={item.id === 1 ? '_blank' : ''}
            onClick={() => analyticsTrackClick(item.link)}
          />
        );
      })}
    </div>
  );
};

export default Page;
