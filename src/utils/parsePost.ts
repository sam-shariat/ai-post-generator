
export function parsePost(data:string):string {
    var withTags = data.replace("TAGS:", "<p><u>TAGS:").replace("Tags:", "<p><u>Tags:");
    var withKeywords = withTags.replace("KEYWORDS:", "</u></p><p><u>KEYWORDS:").replace("Keywords:", "</u></p><p><u>Keywords:");
    var withSummary = withKeywords.replace("SUMMARY:", "</u></p><p><u>SUMMARY:").replace("Summary:", "</u></p><p><u>Summary:");
    var finalData = withSummary + "</u></p>"
    return finalData
}
