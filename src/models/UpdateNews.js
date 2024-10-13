import { useEffect, useState } from "react"
import { NewsUpdate } from "../services/newsletter.service"
import { ResultFunction } from "../comman/resultFunction"

const UpdateNews = (props) =>{
    const [heading,setHeading] = useState("")
    const [news,setNews] = useState("")
    const [id,setId] = useState("")

    useEffect(()=>{console.log("propsorpsoorpsor",props)
        if(props && props.news){
            setHeading(props.news.heading)
            setNews(props.news.news)
            setId(props.news._id)
        }
    },[props])

    const handleNewsUpdate = async() => {
        let data = {
            id:id,
            heading:heading,
            news:news
        }
        let result = await NewsUpdate(data)
        ResultFunction(result,props.allNews)
    }

    return (
        <div
        class="modal"
        id="update_news"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Add News
              </h5>
              <button
                class="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
              <div className="form-group mb-3">
                     <input
                        className="form-control"
                        type="text"
                        placeholder="news heading"
                        name="heading"
                        value={heading}
                        onChange={(e)=>{setHeading(e.target.value)}}
                      />
                    </div>
                <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="news"
                        name="news"
                        value={news}
                        onChange={(e)=>{
                            setNews(e.target.value)
                        }}
                      />
                    </div>
                <button
                  class="btn btn-s btn-indigo btn-block w-100"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={() => handleNewsUpdate()}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
            )
}
export default UpdateNews