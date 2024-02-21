import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


const MarkdownComponent = ({ content }) => {
    return (
        <Markdown>{content}</Markdown>
    );
};

export default MarkdownComponent;
