import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactPlayer from 'react-player';

import './videoModal.scss';

export default function VideoModal({ imgUrl, videoUrl }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div className="video-modal">
      <Button className="modal-btn" variant="none" onClick={openModal}>
        <img className="img-fluid" src={imgUrl} alt=""></img>
      </Button>

      <Modal className="modal-show" show={isModalOpen} onHide={closeModal}>
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="auto"
          playing={true}
          controls={true}
        />
      </Modal>
    </div>
  );
}
