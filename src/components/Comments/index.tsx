import React, { Component } from 'react';
import style from './style.module.scss';

export default class Comments extends Component {
  commentBox: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.commentBox = React.createRef(); // Creates a reference to inject the <script> element
  }

  componentDidMount() {
    const utteranceTheme = 'github-dark';
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', 'https://utteranc.es/client.js');
    scriptEl.setAttribute('crossorigin', 'anonymous');
    scriptEl.setAttribute('async', 'true');
    scriptEl.setAttribute('repo', 'vincentntang/vincentntang.com-comments');
    scriptEl.setAttribute('issue-term', 'pathname');
    scriptEl.setAttribute('theme', utteranceTheme);
    this.commentBox.current?.appendChild(scriptEl);
  }

  render() {
    return (
      <div className={style.container}>
        <div ref={this.commentBox} className="comment-box" />
        {/* Above element is where the comments are injected */}
      </div>
    );
  }
}
