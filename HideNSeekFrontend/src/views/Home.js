import React, { useState } from 'react';
import Button from '../components/elements/Button';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import { useDownloadFile } from '../utils/useDownloadFile';
import axios from 'axios';

const Home = () => {
  const [isHide, setHide] = useState(true);
  const [formData, setFormData] = useState({
    'hide': isHide,
    'file': null,
    'plain-text': "",
    'password': ""
  });

  const handleChange = ({target}) => {
    if(target.name === 'file'){
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.files[0]
      }));
    } else {
      const {name, value} = target;
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  }

  const selectHide = () => {
    setHide(true);
    setFormData({
      'hide': isHide,
      'file': null,
      'plain-text': "",
      'password': ""
    });
  };
  const selectSeek = () => {
    setHide(false);
    setFormData({
      'hide': isHide,
      'file': null,
      'plain-text': "",
      'password': ""
    });
  };

  const [buttonIsDownloading, setButtonState] = useState(false);

  const preDownloading = () => setButtonState(true);
  const postDownloading = () => setButtonState(false);

  const onErrorDownloadFile = () => {
    setButtonState(false);
    alert("Something went wrong. Please try again!");
  };

  const downloadProcessedImage = () => {
    var _formdata = new FormData();
    for(var key in formData){
      _formdata.append(key, formData[key]);
    }
    if(isHide){
      return axios.post(
        "http://127.0.0.1:5000/embed", _formdata,
        {
          responseType: 'blob',
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
    } else {
      return axios.post(
        "http://127.0.0.1:5000/retrieve", _formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*"
          }
        }
      );
    }
  };

  const getFileName = () => {
    return "output.png";
  }

  const { ref, url, download, name } = useDownloadFile({
    isHide: () => isHide,
    apiDefinition: downloadProcessedImage,
    preDownloading,
    postDownloading,
    onError: onErrorDownloadFile,
    getFileName,
  });

  return (
    <>
      <Hero isHide={isHide} selectHide={selectHide} selectSeek={selectSeek} className="illustration-section-01" />
      <FeaturesSplit isHide={isHide} formData={formData} handleChange={handleChange} invertMobile imageFill className="illustration-section-02" />
      <div className="center-content">
          <a href={url} download={name} className="hidden" ref={ref} />
          <Button form='my-form' color="primary" disabled={buttonIsDownloading} onClick={download}>
            {buttonIsDownloading ? "Downloading!": isHide ? "Hide!" : "Seek!"}
          </Button>
      </div>
    </>
  );
}

export default Home;