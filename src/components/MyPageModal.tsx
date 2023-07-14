import React, { useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal';
import { instance } from '../services/Fetcher';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { BorderColor, BorderRadius, FontSize } from '../constants/Index';
import styled from 'styled-components';

export interface ChangePWModalRef {
  openModal: () => void;
}

export interface DeleteUserModalRef {
  openModal: () => void;
}

export const ChangePWModal = React.forwardRef<ChangePWModalRef>(
  (props, ref) => {
    const [modalState, setModalState] = useState(false);
    const [currentPWState, setCurrentPWState] = useState('');
    const [verifiedPWState, setVerifiedPWState] = useState(false);
    const [newPWState, setNewPWState] = useState('');
    const [checkPWState, setCheckPWState] = useState('');

    //MyPage에서 최초로 Modal을 열 때 쓰임.
    useImperativeHandle(ref, () => ({
      openModal() {
        setModalState(true);
      },
    }));

    //맨 처음 비밀번호를 확인하는 Modal을 여는 경우에 대한 핸들러들
    const firstHandleClose = () => {
      setCurrentPWState('');
      setModalState(false);
    };

    const handleCurrentPW = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPWState(e.target.value);
    };

    const handleVerify = async () => {
      try {
        await instance.post('/users/ispasswordcorrect', {
          password: currentPWState,
        });
        setVerifiedPWState(true);
        setModalState(false);
        setCurrentPWState('');
      } catch (err) {
        toast('비밀번호가 일치하지 않습니다.');
      }
    };

    //비밀번호를 확인한 후 변경하는 두번째 모달에 대한 핸들러들
    const secondHandleClose = () => {
      setNewPWState('');
      setCheckPWState('');
      setVerifiedPWState(false);
    };

    const handleNewPW = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPWState(e.target.value);
    };

    const checkNewPW = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckPWState(e.target.value);
    };
    const handlePWChange = async () => {
      if (newPWState.length < 4) {
        toast('비밀번호는 최소 4글자 이상이어야 합니다.');
      } else if (newPWState !== checkPWState) {
        toast('새 비밀번호와 비밀번호 확인 칸이 일치하지 않습니다.');
      } else {
        try {
          await instance.patch('/users/update', {
            password: newPWState,
          });
          setNewPWState('');
          setCheckPWState('');
          setVerifiedPWState(false);
          toast('비밀번호 변경이 완료되었습니다.');
        } catch (e) {
          toast('비밀번호 변경 중 오류가 발생했습니다.');
        }
      }
    };

    return (
      <>
        <ToastContainer
          position="top-center"
          limit={1}
          closeButton={false}
          autoClose={4000}
          hideProgressBar
        />
        {modalState ? (
          <Modal
            title="현재 비밀번호를 입력해주세요."
            onClose={firstHandleClose}
            isOpen={true}
            onSaved={handleVerify}
          >
            <LoginInput
              id="changePWInput"
              onChange={handleCurrentPW}
            ></LoginInput>
          </Modal>
        ) : (
          <></>
        )}
        {verifiedPWState ? (
          <Modal
            title="비밀번호 변경"
            onClose={secondHandleClose}
            isOpen={true}
            onSaved={handlePWChange}
          >
            <LoginInput id="newPWInput" onChange={handleNewPW}></LoginInput>
            <ModalTitle>{'비밀번호 확인'}</ModalTitle>
            <LoginInput id="checkNewPWInput" onChange={checkNewPW}></LoginInput>
          </Modal>
        ) : (
          <></>
        )}
      </>
    );
  }
);

export const DeleteUserModal = React.forwardRef<DeleteUserModalRef>(
  (props, ref) => {
    const [modalState, setModalState] = useState(false);
    const [currentPWState, setCurrentPWState] = useState('');
    const [checkDeleteState, setCheckDeleteState] = useState(false);

    const navigate = useNavigate();

    //MyPage에서 최초로 Modal을 열 때 쓰임.
    useImperativeHandle(ref, () => ({
      openModal() {
        setModalState(true);
      },
    }));

    const firstHandleClose = () => {
      setCurrentPWState('');
      setModalState(false);
    };

    const handleCurrentPW = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPWState(e.target.value);
    };

    const handleVerify = async () => {
      try {
        await instance.post('/users/ispasswordcorrect', {
          password: currentPWState,
        });
        setCheckDeleteState(true);
        setModalState(false);
        setCurrentPWState('');
      } catch (err) {
        toast('비밀번호가 일치하지 않습니다.');
      }
    };

    //비밀번호를 확인한 후 정말 탈퇴하는지 확인하는 핸들러들
    const secondHandleClose = () => {
      setCheckDeleteState(false);
    };

    const handleDelete = async () => {
      try {
        await instance.delete('/users/delete');
        toast('회원탈퇴가 정상적으로 완료되었습니다.');
        setCheckDeleteState(false);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setTimeout(() => {
          navigate('/');
        }, 4000);
      } catch (e) {
        toast('회원탈퇴 중 오류가 발생하였습니다.');
      }
    };
    return (
      <>
        <ToastContainer
          position="top-center"
          limit={1}
          closeButton={false}
          autoClose={4000}
          hideProgressBar
        />
        {modalState ? (
          <Modal
            title="현재 비밀번호를 입력해주세요."
            onClose={firstHandleClose}
            isOpen={true}
            onSaved={handleVerify}
          >
            <LoginInput
              id="deleteUserInput"
              onChange={handleCurrentPW}
            ></LoginInput>
          </Modal>
        ) : (
          <></>
        )}
        {checkDeleteState ? (
          <Modal
            title="정말로 회원탈퇴를 진행하십니까?"
            onClose={secondHandleClose}
            isOpen={true}
            onSaved={handleDelete}
          >
            <></>
          </Modal>
        ) : (
          <></>
        )}
      </>
    );
  }
);

export const LoginInput = styled.input.attrs((props) => ({
  placeholder: props.placeholder,
}))`
  padding: 4%;
  width: 90%;
  margin: 2% auto;
  border-radius: ${BorderRadius.inputRadius};
  border: ${BorderColor.thinBorder};
  font-size: ${FontSize.h3};
`;

export const ModalTitle = styled.div`
  width: fit-content;
  padding: 2%;
  margin: 2% auto;
  color: #00ad5c;

  & > span {
    font-weight: 600;
  }
`;
