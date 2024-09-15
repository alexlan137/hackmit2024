import React, { useState } from "react";
import "../stylesheets/ChatBot.css";

const CreateToggleResponse = ({ position, response }) => {
  const [expand, setExpand] = useState(false);

  return (
    <div>
      <br />
      <p onClick={() => setExpand(!expand)} className="toggler">
        <b>{position} perspective</b>
      </p>
      <br />
      {expand ? (
        <div>
          {response.split("\n").map((paragraph, idx) => (
            <p key={idx}>
              {paragraph}
              <br />
            </p>
          ))}
          <p onClick={() => setExpand(false)} className="toggler">
            Close
          </p>
          <hr />
        </div>
      ) : null}

      <br />
    </div>
  );
};

function Message({ content, isUser }) {
  //if user, text is just raw English
  if (isUser) {
    return <div className="message user">{content}</div>;
  }

  if (content == "Generating response...") {
    return <div className="message bot">{content}</div>;
  }

  //now suppose it's bot with an actual article
  const { article_link, output, data_all } = content;
  return (
    <div className="message bot">
      <div>
        Article link:{" "}
        <a href={article_link} target="_blank">
          {article_link}
        </a>
        {CreateToggleResponse({ position: "Aggregate", response: output })}
      </div>
      {data_all.map(CreateToggleResponse)}
    </div>
  );
}

export default Message;
