import React from 'react';
import FeedbackForm from '../FeedbackForm';
import '../../css/EditorStyle.css';

class EditorInstructions extends React.Component {
  render() {
    return (
      <div className='ui sticky'>
        <h2 className='ui header'>Instructions</h2>
        <p style={{ fontSize: '12pt' }}>
          시나리오/대본 작성 앱입니다.
          <br />
          <br />
          현재 5가지의 텍스트 포멧이 설정돼 있습니다:
        </p>
        <ul>
          <li>씬</li>
          <li>액션</li>
          <li>캐릭터</li>
          <li>대사</li>
          <li>트렌지션</li>
        </ul>
        <br />
        <p style={{ fontSize: '12pt' }}>
          이 포멧들은 <span className='ui label'>Tab</span>과{' '}
          <span className='ui label'>Tab + Shift</span> 을 통해 선택할 수
          있습니다.
        </p>
        <p style={{ fontSize: '12pt' }}>
          아직 아주아주 초기단계에 있으니 없는 기능도 많고 작동이 잘 되지 않는
          것도 많을겁니다. 버그를 발견했거나, 있으면 좋을거 같은 기능이 있거나,
          그냥 피드백이 있다면 언제든지 환영입니다!
        </p>
        <FeedbackForm />
        <br />
        <br />
        <h4>* 현재 한글 입력시 버그들 잇음 ㅜ *</h4>
        <p style={{ fontSize: '12pt' }}>
          한글로 캐릭터 혹은 대사 입력시 엔터 누르기 전에 스페이스 한번 누르면
          문제는 없음
        </p>
      </div>
    );
  }
}

export default EditorInstructions;
