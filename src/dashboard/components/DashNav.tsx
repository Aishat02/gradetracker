import { useRef, useState, useEffect } from "react";
import UserHome from "./UserHome";
import CourseManagement from "./CourseManagement";
import UserSettings from "./Settings";
import InputGrades from "./InputGrades";
import Scenarios from "./Scenarios";
import logo from "/logo.svg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import {
  House,
  Plus,
  TrendingUpDown as Trend,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  CircleUserRound as User,
} from "lucide-react";
import { useAuth } from "../../features/authentication/hooks/useAuth";

const DashNav: React.FC = () => {
  const { useSignout } = useAuth();
  const signout = useSignout();

  const sidebar = [
    {
      key: "home",
      section: "Dashboard",
      icon: <House />,
      component: <UserHome />,
    },
    {
      key: "course",
      section: "Add/Edit Course",
      icon: <Plus />,
      component: <CourseManagement />,
    },
    {
      key: "grades",
      section: "Course Grades",
      icon: <House />,
      component: <InputGrades />,
    },
    {
      key: "scenarios",
      section: "What-if-scenarios",
      icon: <Trend />,
      component: <Scenarios />,
    },
    {
      key: "settings",
      section: "Settings",
      icon: <Settings />,
      component: <UserSettings />,
    },
  ];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(true);

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -150 : 150,
        behavior: "smooth",
      });
    }
  };

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setScrollLeft(scrollLeft > 0);
    setScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    const scrollState = scrollRef.current;
    if (!scrollState) return;

    updateScrollState();
    scrollState.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      scrollState.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <Tab.Container defaultActiveKey="home">
      <Row className="bg-whitesmoke m-0 p-0 gap-4 gap-lg-5 d-md-flex dashboard-container">
        <Col lg={3} className="sidebar p-0 bg-white shadow">
          <Navbar className="border-bottom">
            <Container fluid>
              <Navbar.Brand href="#" className="d-flex align-items-center">
                <img src={logo} alt="logo" width="30" height="24" />
                GradeTracker
              </Navbar.Brand>
              <Nav>
                <Nav.Link>
                  <User size={27} />
                </Nav.Link>
                <Nav.Link onClick={() => signout.mutate()}>
                  <LogOut size={27} />
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>

          <div>
            <ListGroup
              ref={scrollRef}
              variant="flush"
              className="overflow-auto flex-row flex-lg-column flex-nowrap w-90 "
              style={{
                whiteSpace: "nowrap",
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
              }}
            >
              {scrollLeft && (
                <Button
                  onClick={() => scroll("left")}
                  variant="transparent"
                  className="position-absolute border-0 start-0 z-3"
                >
                  <ChevronLeft color="black" />
                </Button>
              )}
              {sidebar.map((item, index) => (
                <ListGroup.Item
                  action
                  key={index}
                  eventKey={item.key}
                  className="d-flex border-0 align-items-center gap-2 "
                >
                  {item.icon}
                  {item.section}
                </ListGroup.Item>
              ))}
              {scrollRight && (
                <Button
                  onClick={() => scroll("right")}
                  variant="transparent"
                  className="position-absolute end-0 border-0 z-3"
                  style={{ zIndex: 3 }}
                >
                  <ChevronRight color="black" />
                </Button>
              )}
            </ListGroup>
          </div>
        </Col>

        <Col sm={12} lg={8} className="dashboard-body">
          <Tab.Content>
            {sidebar.map((item, index) => (
              <Tab.Pane key={index} eventKey={item.key}>
                {item.component}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default DashNav;
