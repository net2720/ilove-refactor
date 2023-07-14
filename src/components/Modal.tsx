import * as Style from './styles/ModalStyle';

// 상수로 뽑아둔 color, fontSize 연결 링크
import { Colors } from '../constants/Colors';
import { FontSize } from '../constants/FontSize';

interface ModalProps {
  title?: string;
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onSaved: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  onSaved,
}) => {
  const onSaveHandler = () => {
    onSaved(); // onSaved 함수 호출
    onClose(); // onClose 함수 호출
  };

  const ModalBtnProps = {
    $btnFontSize: `${FontSize.h2}`,
    $bgcolor: `${Colors.primary} !important`,
    $borderOutLine: `${Colors.InputBorderOut} !important`,
    width: 'fit-content',
    height: 'fit-content',
    color: 'white',
  };

  const closeModalHandler = () => {
    onClose(); // onClose 함수 호출
  };

  return (
    <>
      <Style.ModalContainer>
        {isOpen && (
          <Style.ModalBackdrop onClick={closeModalHandler}>
            <Style.ModalView
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                e.stopPropagation()
              }
            >
              <Style.ModalTitle>
                <span>{title}</span>
              </Style.ModalTitle>
              <div>{children}</div>
              <div>
                <Style.ModalBtn
                  {...ModalBtnProps}
                  label={'닫기'}
                  onClick={closeModalHandler}
                >
                  닫기
                </Style.ModalBtn>
                <Style.ModalBtn
                  {...ModalBtnProps}
                  label={'확인'}
                  onClick={onSaveHandler}
                >
                  확인
                </Style.ModalBtn>
              </div>
            </Style.ModalView>
          </Style.ModalBackdrop>
        )}
      </Style.ModalContainer>
    </>
  );
};
