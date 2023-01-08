import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

import { setPopup } from '../../../store/action';
import { CloseBtn, PersonUl, Popup, PopupBody, PopupContent } from './common-modal.style';


type CommonModalProps = {
  professionTabs?: JSX.Element;
  elements: JSX.Element[] | null;
}

export default function CommonModal({professionTabs, elements} : CommonModalProps) {

  const dispatch = useDispatch();

  const closePopup = () => dispatch(setPopup(false));

  const handleCloseBtnClick = () => closePopup();

  const handleEscapeKeyDown = (evt: KeyboardEvent) => {
    if (evt.code === 'Escape') {
      closePopup();
    }
  };

  const handleOutsideClick = (evt: MouseEvent) => {
    if (evt.target instanceof Element && !evt.target.closest('#popup') && !evt.target.closest('#modal-btn')) {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeyDown);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyDown);
      document.removeEventListener('click', handleOutsideClick);
    };
  });


  return (
    <FocusLock>
      <RemoveScroll>
        <Popup>
          <PopupBody>
            <PopupContent id='popup'>
              <CloseBtn onClick={handleCloseBtnClick}>
                <i className="material-icons">close</i>
              </CloseBtn>
              {professionTabs}

              <PersonUl>
                {elements && elements.length ? elements : 'Никого нет'}
              </PersonUl>
            </PopupContent>
          </PopupBody>
        </Popup>
      </RemoveScroll>
    </FocusLock>
  );
}
