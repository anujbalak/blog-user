import DOMPurify from 'dompurify'


export const useSanitizedHtml = (htmlString) => {
    return DOMPurify.sanitize(htmlString);
}