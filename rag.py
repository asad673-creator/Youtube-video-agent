from langchain_core.prompts import ChatPromptTemplate
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
from dotenv import load_dotenv
load_dotenv()

def create_rag_chain(retriever):

    llm = HuggingFaceEndpoint(
        repo_id="deepseek-ai/DeepSeek-V4.1-Flash",
        temperature=0.7
    )

    model = ChatHuggingFace(llm=llm)

    prompt = ChatPromptTemplate.from_template(
        """
        Answer the question using only the context below.

        Context:
        {context}

        Question:
        {question}

        If the answer is not in the context, say:
        "I couldn't find the answer in the video."
        """
    )

    def rag(question):

        docs = retriever.invoke(question)

        context = "\n\n".join(
            doc.page_content for doc in docs
        )

        response = model.invoke(
            prompt.format(
                context=context,
                question=question
            )
        )

        return response.content

    return rag