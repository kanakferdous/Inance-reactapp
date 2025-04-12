import s1 from "../assets/images/s1.png";
import s2 from "../assets/images/s2.png";
import s3 from "../assets/images/s3.png";

function ServicePage() {
  return (
    <section class="service_section layout_padding">
      <div class="container ">
        <div class="heading_container heading_center">
          <h2> Our Services </h2>
        </div>
        <div class="row">
          <div class="col-sm-6 col-md-4 mx-auto">
            <div class="box ">
              <div class="img-box">
                <img src={s1} alt="" />
              </div>
              <div class="detail-box">
                <h5>Maintenance</h5>
                <p>
                  when looking at its layout. The point of using Lorem Ipsum is
                  that it has a more-or-less normal
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 mx-auto">
            <div class="box ">
              <div class="img-box">
                <img src={s2} alt="" />
              </div>
              <div class="detail-box">
                <h5>Electrical</h5>
                <p>
                  when looking at its layout. The point of using Lorem Ipsum is
                  that it has a more-or-less normal
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 mx-auto">
            <div class="box ">
              <div class="img-box">
                <img src={s3} alt="" />
              </div>
              <div class="detail-box">
                <h5>Plumbing</h5>
                <p>
                  when looking at its layout. The point of using Lorem Ipsum is
                  that it has a more-or-less normal
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-box">
          <a href="">View More</a>
        </div>
      </div>
    </section>
  );
}

export default ServicePage;