import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const HandleForm = ({ fetchMemes }) => {
  const [owner, setOwner] = useState("");
  const [caption, setCaption] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [check, setCheck] = useState(0);

  // will check for valid image urls else will show error and will not allow user to submit meme with invalid imageURL
  // function checkURL() {
  //   const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
  //   if (imageURL.match(regex)) {
  //     setInvalid(false);
  //     return true;
  //   } else {
  //     console.log("false");
  //     setInvalid(true);
  //     return false;
  //   }
  // }

  // will check all fields like if inputs are not empty
  function checkFields() {
    if (owner.length === 0 || caption.length === 0 || imageURL.length === 0) {
      setCheck(1);
      return false;
    } else {
      // if (checkURL()) {
      //   setInvalid(false);
      //   setCheck(0);
      //   return false;
      // } else {
      //   setInvalid(true);
      //   setCheck(1);
      //   return false;
      // }
      setCheck(0);
      return true;
    }
  }

  // will check all fields if everting is fine then it will post meme else it won't
  const postMeme = () => {
    if (checkFields()) {
      fetch("/memes", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: owner,
          caption: caption,
          url: imageURL,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.error) {
            // will show a popup/toast of Error message
            toast.error(data.error);
            // alert("yes");
          } else {
            // will show toast of success message
            toast.success(data.message);

            // will show memes with updated list
            fetchMemes();
            // will reset all fields
            setOwner("");
            setCaption("");
            setImageURL("");
            setCheck(0);
          }
        });
    }
  };

  return (
    <Form className="form">
      <Form.Group controlId="name">
        <Form.Label>Meme Owner</Form.Label>
        <Form.Control
          type="text"
          value={owner}
          placeholder="Enter your full name"
          onChange={(e) => setOwner(e.target.value)}
        />
        <Form.Text className="text-muted">
          {check && owner.length === 0 ? (
            <p style={{ color: "red" }}>Enter Meme Owner</p>
          ) : null}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="caption">
        <Form.Label>Caption</Form.Label>
        <Form.Control
          value={caption}
          type="text"
          placeholder="Be Creative with the caption"
          onChange={(e) => setCaption(e.target.value)}
        />
        <Form.Text className="text-muted">
          {check && caption.length === 0 ? (
            <p style={{ color: "red" }}>Enter Caption</p>
          ) : null}
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="url">
        <Form.Label>Meme URL</Form.Label>
        <div className="inline">
          <Form.Control
            value={imageURL}
            style={{ width: "55vw" }}
            type="text"
            placeholder="Enter URL of your meme here"
            onChange={(e) => {
              setImageURL(e.target.value);
              // checkURL();
            }}
          />
          <Button variant="primary" onClick={postMeme} className="submitMeme">
            Submit Meme
          </Button>
        </div>
        <Form.Text className="text-muted">
          {/* {(check && invalidUrl) || imageURL.length === 0 ? (
            <p style={{ color: "Red" }}>Add URL</p>
          ) : null} */}

          {check && imageURL.length === 0 ? (
            <p style={{ color: "Red" }}>Add URL</p>
          ) : null}
        </Form.Text>
      </Form.Group>
    </Form>
  );
};

export default HandleForm;
