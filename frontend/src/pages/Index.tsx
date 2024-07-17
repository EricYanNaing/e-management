import { useEffect, useState } from "react";
import Events from "../components/Events";
import { getEvents } from "../lib/actions/eventform-actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store/store";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.authData.token);
  const events = useSelector((state: RootState) => state.eventData.events);

  useEffect(() => {
    setLoading(true);

    getEvents(dispatch, token);

    setLoading(false);
  }, [dispatch]);

  return (
    <section>
      {events.length &&
        !loading &&
        events.map((event) => <Events key={event.title} event={event} />)}
    </section>
  );
};

export default Index;
