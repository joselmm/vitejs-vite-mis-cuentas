import React, { useEffect, useState,useRef } from 'react';
import {
  setPlatformToDeleteId,
  removePlatform,
} from '../../../features/platforms';

import { useSelector, useDispatch } from 'react-redux';

const DeletePlatformConfirm = ({ quit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms);
  const { platformToDeleteId: currentId, value: platformList } = platforms;
  const platformToDeleteIdRef=useRef(currentId)
  var currentPlatform = platformList.filter(
    (platform) => platform.id === currentId
  )[0];

  useEffect(() => {
    if (platformList.findIndex((platform) => platform.id === platformToDeleteIdRef.current) >= 0) {
      console.log('existe',currentId);
    } else {
      console.log('ya se borro');
      quit();
    } 

    return () => {
      console.log('de desmonto el DeletePlatformConfirm');
      dispatch(setPlatformToDeleteId(null));
      
    };
  }, [platformList]);

  function deleteSelectedPlatform() {
    dispatch(removePlatform(platformToDeleteIdRef.current));
    setIsDeleting(true);
  }

  return (
    <div
      className="bg-dark border border-danger text-white text-center p-3"
      style={{ width: '300px' }}
    >
      <p>
        Seguro que quieres borrar la plataform
        {currentPlatform ? ' ' + currentPlatform.platformName : null}?
      </p>
      {isDeleting ? (
        <div class="alert alert-warning" role="alert">
          Se está borrando...
        </div>
      ) : (
        <>
          <button
            onClick={deleteSelectedPlatform}
            className="btn btn-danger mr-3"
          >
            CONFIRMAR
          </button>
          <button onClick={quit} className="btn btn-primary">
            CANCELAR
          </button>
        </>
      )}
    </div>
  );
};

export default DeletePlatformConfirm;
