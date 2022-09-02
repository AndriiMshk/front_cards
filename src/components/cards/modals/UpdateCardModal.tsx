import React from 'react';
import { useAppDispatch } from '../../../app/bll-dal/store';
import { TextField } from '@mui/material';
import { BasicModal } from '../../../common/basicModal/BasicModal';
import { updateCard } from '../bll-dal/cards-async-actions';
import style from '../../../common/basicModal/basicModal.module.scss';

export const UpdateCardModal: React.FC<UpdateCardPropsType> =
  React.memo(({ cardId, cardQuestion, cardAnswer, isOpenModal, setIsOpenModal }) => {

    const dispatch = useAppDispatch();

    const [newCardQuestion, setNewCardQuestion] = React.useState(cardQuestion);
    const [newCardAnswer, setNewCardAnswer] = React.useState(cardAnswer);

    const updateCardHandler = () => {
      cardId && dispatch(updateCard(cardId, newCardQuestion, newCardAnswer));
      setNewCardQuestion('');
      setNewCardAnswer('');
    };

    return (
      <BasicModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        operationTitle="Change Card"
        buttonName="Save"
        handleOperation={updateCardHandler}>
        <div className={style.cardContent}>
          <TextField
            label="Question"
            variant="standard"
            color="primary"
            value={newCardQuestion}
            onChange={e => setNewCardQuestion(e.currentTarget.value)} />
          <TextField
            label="Answer"
            variant="standard"
            color="primary"
            value={newCardAnswer}
            onChange={e => setNewCardAnswer(e.currentTarget.value)} />
        </div>
        <div style={{ wordWrap: 'break-word' }}>
          Do you really want to change <b>{cardQuestion}</b> and <b>{cardAnswer}</b>?
        </div>
      </BasicModal>
    );
  });

type UpdateCardPropsType = {
  cardId: string | undefined
  cardQuestion: string | undefined
  cardAnswer: string | undefined
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
}
