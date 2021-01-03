import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const FeedbackForm = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      // style={{ height: '50vh' }}
      centered={true}
      trigger={<Button color='green'>피드백하기!</Button>}
    >
      <Modal.Header>피드백</Modal.Header>
      <Modal.Content scrolling={false}>
        <div style={{ height: '25vh' }}>
          <iframe
            src='https://app.traggr.com/embed/v1/feedbackform?token=1533ea80-dfab-452e-ab71-281b672600e4&verification=646be223-6151-40ac-b45c-49f492a692e0&bg=%23ffffff&bbg=%2326e600&bc=%23ffffff&source=5'
            style={{
              border: 'none',
              height: '100%',
              width: '100%',
              scrolling: 'no',
            }}
            title='Feedback Form'
          ></iframe>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default FeedbackForm;
