
-- phpMyAdmin SQL Dump
-- version 3.4.7.1
-- http://www.phpmyadmin.net
--
-- Host: mysql.edb.utexas.edu
-- Generation Time: Feb 18, 2013 at 02:24 PM
-- Server version: 5.0.77
-- PHP Version: 5.2.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `roser_childwrit`
--

-- --------------------------------------------------------

--
-- Table structure for table `category_tags`
--

CREATE TABLE IF NOT EXISTS `category_tags` (
  `maintag_id` int(9) NOT NULL auto_increment,
  `maintag_title` varchar(128) NOT NULL,
  PRIMARY KEY  (`maintag_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `category_tags`
--

INSERT INTO `category_tags` (`maintag_id`, `maintag_title`) VALUES
(1, 'Stylistic choices'),
(2, 'Language uses'),
(3, 'Format (design)'),
(4, 'Emergent Literacy '),
(5, 'Composing across multiple modalities'),
(6, 'A TEST CATEGORY'),
(7, 'Test top category');

-- --------------------------------------------------------

--
-- Table structure for table `discussion_comment`
--

CREATE TABLE IF NOT EXISTS `discussion_comment` (
  `discussion_comment_id` int(11) NOT NULL auto_increment,
  `topic_id` int(11) NOT NULL,
  `comment_author` int(11) NOT NULL,
  `comment_text` text NOT NULL,
  `comment_date` varchar(11) NOT NULL,
  PRIMARY KEY  (`discussion_comment_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=39 ;

--
-- Dumping data for table `discussion_comment`
--

INSERT INTO `discussion_comment` (`discussion_comment_id`, `topic_id`, `comment_author`, `comment_text`, `comment_date`) VALUES
(1, 1, 163, '<p>new comment</p>', '1348078851'),
(2, 2, 163, '<p>Another comment</p>', '1348082238'),
(3, 2, 163, '<p>one more comment</p>', '1348082474'),
(4, 3, 163, '<p>this is a comment for this topic</p>', '1348082669'),
(5, 1, 162, '<p>my first comment</p>', '1348085350'),
(6, 3, 162, '<p>test comment</p>', '1348085670'),
(7, 1, 163, '<p><strong style=\\"color: #000000; font-family: Arial, Helvetica, sans; font-size: 11px; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: 14px; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;\\">Lorem Ipsum</strong><span style=\\"color: #000000; font-family: Arial, Helvetica, sans; font-size: 11px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 14px; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; display: inline !important; float: none;\\"><span class=\\"Apple-converted-space\\">&nbsp;</span>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>', '1349449203'),
(8, 5, 162, '<p>comment 1</p>', '1349800737'),
(9, 5, 162, '<p>Comment 2</p>', '1352828827'),
(10, 5, 162, '<p>Comment 3</p>', '1352829418'),
(11, 5, 162, '<p>Comment 4</p>', '1353427623'),
(12, 6, 165, '<p>comment 1 by teacher</p>', '1359045596'),
(13, 6, 165, '<p>comment 2 by teacher</p>', '1359045604'),
(14, 6, 167, '<p>student comment 1</p>', '1359046043'),
(15, 7, 166, '<p>Faux comment for this blog item.</p>', '1359062018'),
(16, 6, 166, '<p>Faux comment for Topic 1.</p>', '1359062047'),
(17, 8, 168, '<p>Accessing this resource for user test-4th grader cursive better than mine?</p>', '1359565301'),
(18, 8, 168, '<p>Why does it say \\"Hey, Charles\\" here?</p>', '1359565644'),
(19, 10, 162, '<p>This is a test comment.</p>', '1359740136'),
(20, 10, 162, '<p><br />This is the second test comment.</p>', '1359742205'),
(21, 9, 168, '<p>I double your discussion here.</p>', '1359991791'),
(22, 9, 168, '<p>In the drawing about, I see implicit dynamic tension: one kid is holding another one up in the air...</p>', '1359991880'),
(23, 9, 168, '<p>Adding further comments on this wonderful painting, but not dealing with the other discussion items.</p>', '1359993546'),
(24, 9, 169, '<p>As a TEACHER, I am posting on this discussion thread that cesar, the student posted.</p>', '1359994698'),
(25, 11, 168, '<p>Sample response NEW TOPIC: could it be water polo?</p>', '1359996028'),
(26, 12, 168, '<p>Posting to a second comment in one session as a student with Jon the teacher.</p>', '1359996074'),
(27, 12, 168, '<p>Adding to the discussion of \\''Another New topic\\''&nbsp;</p>\n<p>You need:</p>\n<ol>\n<li>coloured cardboard&nbsp;</li>\n<li>wallpaper&nbsp;</li>\n<li>wrapping paper</li>\n<li>tempera paint</li>\n<li>black marker</li>\n<li>brushes</li>\n<li>scissors and glue</li>\n</ol>\n<div>\n<div>Students draw a birdhouse with a special entrance on brown wrapping paper. This entrance can be a heart, a star of even a bird. Cut this entrance and outline the hole with a black marker.</div>\n<div>Paint the house with cheerful colours.</div>\n<div>Paste it on a piece of wallpaper and cut it out with 2 cm around. Paste a strip of black paper on the cardboard, this is the standard for birdhouse. Paste the birdhouse on the standard. Outline the house with black marker.</div>\n<div>From:&nbsp;http://kidsartists.blogspot.com/</div>\n</div>', '1359997421'),
(28, 13, 168, '<p>May be he or she ran into somebody in playground and that is who they saw.</p>', '1359998000'),
(29, 13, 171, '<p>I\\''m confused by the \\''I had a pain in my head\\''; I have trouble connecting the pain and the \\''welcome back\\''???</p>', '1360077999'),
(30, 9, 171, '<p>I am adding comments to the discussion and I have alot to say:&nbsp;Suspendisse id enim turpis. Quisque quis erat et lorem ornare accumsan id in sapien. Vestibulum vehicula varius odio, eget accumsan massa ullamcorper sed. Aliquam massa nunc, congue eget vehicula id, eleifend at elit. Vivamus suscipit dapibus ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin auctor ultrices semper. Morbi vitae leo ante.&nbsp;</p>', '1360078181'),
(31, 11, 171, '<p>Here again, I feel wordy:&nbsp;Aenean aliquet auctor turpis, eu eleifend felis laoreet eu. In elit tortor, fringilla ac scelerisque sed, lobortis nec eros. Nulla facilisi. Proin pulvinar quam eget ante eleifend sed consectetur nibh rutrum. Duis posuere interdum ante, sit amet lobortis libero laoreet nec. Donec porttitor iaculis eros quis facilisis. Nullam vehicula elit ut lectus euismod scelerisque.</p>', '1360078243'),
(32, 12, 171, '<p>I will just post these words here to add to the discussion.</p>', '1360078282'),
(33, 13, 171, '<p>I feel compelled to comment on this thread. Trying to resist the urge to write in length, I decide to write these simple lines.</p>', '1360078419'),
(34, 9, 171, '<p>At this juncture I will include my observations of the \\''This is an example...\\'', the use of colors is the text that the student uses for the expression of both objects and actions. While regular written text distinguishes between the noun and verb, the use of colors may signify this distinction.</p>', '1360079934'),
(35, 14, 169, '<p>In posting this comment on the discussion thread, I am trying to add greater variability to the lenght of the discussions. On the things that I have noted, that I would like, is to edit these comments as sometimes I introduce typo\\''s.</p>', '1360081665'),
(36, 14, 168, '<p>Will discuss this topic in some length:<span style=\\"color: #202070; font-family: Times; font-size: large; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; display: inline !important; float: none;\\">Le professeur fait &eacute;couter une premi&egrave;re fois &agrave; toute la classe chaque cassette et demande aux apprenants, au cours d\\''une deuxi&egrave;me &eacute;coute, de corriger les erreurs (phon&eacute;tiques, lexicales, etc.) qu\\''ils remarquent. Ces erreurs peuvent servir de base &agrave; des r&eacute;visions ou, &eacute;ventuellement, &agrave; l\\''introduction de nouveaux sujets, &agrave; la suite de l\\''activit&eacute; ou les jours suivants. On peut &eacute;galement, selon le niveau de la classe, encha&icirc;ner sur une discussion sur les diff&eacute;rences personnelles et culturelles face au t&eacute;l&eacute;phone (mani&egrave;re de se pr&eacute;senter, etc.) et au portable. Il est, par ailleurs, possible d\\''introduire l\\''activit&eacute; par des exercices de compr&eacute;hension auditive se rapportant &agrave; des conversations t&eacute;l&eacute;phoniques.</span></p>', '1360082496'),
(37, 13, 171, '<p>The <strong><span style=\\"font-family: book antiqua,palatino;\\">post</span></strong> on the specific sample, I had a pain..., <span style=\\"font-size: large;\\">seems </span>out of <span style=\\"background-color: #ffff00;\\">place here</span> as as the image displayed now is: Hey, charles.</p>\n<p>2013-02-05</p>\n<p>&nbsp;10:50:26<img src=\\"http://latex.codecogs.com/gif.latex?\\\\sum&amp;space;\\\\left&amp;space;(&amp;space;\\\\leq&amp;space;\\\\right&amp;space;)\\" alt=\\"\\\\sum \\\\left ( \\\\leq \\\\right )\\" width=\\"80\\" height=\\"37\\" align=\\"absmiddle\\" /></p>', '1360083084'),
(38, 14, 171, '<p>I thought that this blog had already been posted to, in French.</p>', '1360083182');

-- --------------------------------------------------------

--
-- Table structure for table `discussion_thread`
--

CREATE TABLE IF NOT EXISTS `discussion_thread` (
  `disc_docnum` int(9) NOT NULL,
  `disc_date` date NOT NULL,
  `disc_time` time NOT NULL,
  `disc_userid` int(9) NOT NULL,
  `disc_thread` varchar(512) NOT NULL,
  `disc_comment` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `discussion_thread`
--

INSERT INTO `discussion_thread` (`disc_docnum`, `disc_date`, `disc_time`, `disc_userid`, `disc_thread`, `disc_comment`) VALUES
(1, '2012-07-30', '14:01:21', 69, 'Handwriting', 'good cursive handwriting'),
(2, '2012-07-27', '14:01:21', 69, 'Content', 'expressive with drawings'),
(3, '2012-07-30', '14:03:56', 69, 'Handwriting', 'good cursive handwriting. Too bad.  The scanned image is not so clear'),
(4, '2012-07-24', '14:05:38', 69, 'Handwriting', 'Good cursive writing'),
(1, '2012-07-26', '14:06:24', 68, 'Handwriting', 'Good writing.'),
(1, '2012-07-30', '14:07:48', 69, 'Content', 'Drawing emphasized the words written.'),
(2, '2012-07-27', '14:09:49', 69, 'Drawings', 'good use of stick people drawing'),
(2, '2012-07-24', '14:12:08', 69, 'Handwriting', 'well-written (we won).'),
(3, '2012-07-31', '14:13:16', 69, 'Content', 'Good imagination.'),
(3, '2012-07-20', '14:14:30', 69, 'Content', 'Good narration of a past event'),
(4, '2012-07-17', '14:19:48', 69, 'Handwriting', 'Good handwriting within the lines.'),
(4, '2012-07-26', '14:21:17', 69, 'Handwriting', 'Cursive writing is very good.'),
(4, '2012-07-18', '14:22:10', 69, 'Handwriting', 'well-written'),
(5, '2012-07-23', '14:24:20', 69, 'Handwriting', 'Good representation of early writing'),
(5, '2012-07-31', '14:25:01', 69, 'Content', 'Make use of drawing for expressing thoughts'),
(5, '2012-07-30', '14:26:39', 69, 'Content', 'Drawing was used for expression'),
(5, '2012-07-18', '14:27:18', 69, 'Content', 'Lots of drawings'),
(5, '2012-07-30', '14:28:18', 69, 'Handwriting', 'Precursor to handwriting'),
(6, '2012-07-31', '14:29:15', 69, 'Handwriting', 'Good handwriting'),
(6, '2012-07-25', '14:29:43', 69, 'Handwriting', 'handwriting is good'),
(6, '2012-07-27', '14:30:51', 69, 'Content', 'Draws audience to content'),
(6, '2012-07-24', '14:31:33', 69, 'Content', 'Good content.'),
(6, '2012-07-25', '14:31:58', 69, 'Content', 'Good use of words and drawings'),
(7, '2012-07-25', '14:38:20', 69, 'Content', 'Creative use of letters'),
(7, '2012-07-31', '14:38:58', 69, 'Content', 'Very creative and colorful'),
(7, '2012-07-25', '14:40:46', 69, 'Content', 'good presentation'),
(8, '2012-07-23', '14:42:19', 69, 'Content', 'good presentation'),
(8, '2012-07-31', '14:42:55', 69, 'Content', 'Good layout'),
(8, '2012-07-17', '14:44:06', 69, 'Content', 'Sentence sequence is good.'),
(8, '2012-07-18', '14:44:59', 69, 'Content', 'Expression and sequence of thoughts are good'),
(9, '2012-07-16', '14:48:04', 69, 'Content', 'Good arrangement '),
(9, '2012-07-31', '14:48:29', 69, 'Content', 'good presentation'),
(9, '2012-07-30', '14:49:10', 69, 'Content', 'Expression of thought is good'),
(10, '2012-07-30', '14:49:10', 69, 'Drawings', 'Good representation of conversation'),
(10, '2012-07-31', '14:50:24', 69, 'Drawings', 'well-drawn'),
(10, '2012-07-16', '14:51:32', 69, 'Drawings', 'Drawing presents good understanding of content'),
(1, '2012-07-31', '16:35:23', 69, 'Handwriting', 'developed handwriting'),
(1, '2012-07-18', '16:36:03', 69, 'Content', 'Good use of drawing'),
(1, '2012-07-23', '16:36:58', 69, 'Content', 'well-written thoughts');

-- --------------------------------------------------------

--
-- Table structure for table `discussion_topic`
--

CREATE TABLE IF NOT EXISTS `discussion_topic` (
  `discussion_topic_id` int(11) NOT NULL auto_increment,
  `discussion_class_id` int(11) NOT NULL,
  `topic_text` text NOT NULL,
  `topic_creator` int(11) NOT NULL,
  `topic_date` int(11) NOT NULL,
  PRIMARY KEY  (`discussion_topic_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `discussion_topic`
--

INSERT INTO `discussion_topic` (`discussion_topic_id`, `discussion_class_id`, `topic_text`, `topic_creator`, `topic_date`) VALUES
(1, 17, '<p>test</p>', 163, 1348074652),
(2, 17, '<p>new topic test</p>', 163, 1348076301),
(3, 17, '<p>thrid topic test</p>', 163, 1348082657),
(4, 17, '<p>Lorem Ipsum has been the industry\\''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining esentially unchanged.</p>', 163, 1349723077),
(5, 18, '<p>test topic</p>', 162, 1349800607),
(6, 21, '<p>Topic 1</p>', 165, 1359045587),
(7, 21, '<p>Topic 2</p>', 165, 1359045623),
(8, 20, '<p>Trying out the discussion function on the \\''Hey, Charles\\'' resource.</p>', 166, 1359061800),
(9, 23, '<p>&lt;discussion goes here&gt;</p>', 169, 1359663721),
(10, 22, '<p>This is a test topic~</p>', 170, 1359738544),
(11, 23, '<p>NEW TOPIC: what is \\"Wet &amp; Wild\\" how do have ball games there?</p>', 169, 1359994996),
(12, 23, '<p>Another NEW TOPIC &nbsp;is added herer (to see if a teacher can create more than one topic at a time).</p>', 169, 1359995654),
(13, 24, '<p>NEW Discussion: What did he see: Tylenol?</p>', 169, 1359997874),
(14, 24, '<p>ANOTHER TOPIC OF GREAT IMPORTANCE</p>', 169, 1360081461);

-- --------------------------------------------------------

--
-- Table structure for table `resource_doc`
--

CREATE TABLE IF NOT EXISTS `resource_doc` (
  `doc_number` int(9) NOT NULL auto_increment,
  `filename` varchar(128) NOT NULL,
  `filepath` varchar(256) NOT NULL,
  `title` varchar(256) NOT NULL,
  `description` varchar(256) NOT NULL,
  `author` varchar(64) NOT NULL,
  `grade_level` int(9) NOT NULL,
  `grade_desc` varchar(12) NOT NULL,
  `age` int(3) NOT NULL,
  `star_rating` int(2) default NULL,
  PRIMARY KEY  (`doc_number`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=55 ;

--
-- Dumping data for table `resource_doc`
--

INSERT INTO `resource_doc` (`doc_number`, `filename`, `filepath`, `title`, `description`, `author`, `grade_level`, `grade_desc`, `age`, `star_rating`) VALUES
(16, '1360579148_12431415.jpg', '', 'It was a Random Day', '', '', 3, '4-5', 0, NULL),
(17, '1360579562_12431415.jpg', '', 'We won!', '<p>We won!</p>', 'David Kim', 1, 'PK-1', 10, NULL),
(18, '1360579787_12431415.jpg', '', 'On a warm sunny day', '', '', 3, '4-5', 0, NULL),
(19, '1360585505_12431415.jpg', '', 'Wham!', '<p>This is a description of Wham!</p>', '', 3, '4-5', 0, NULL),
(20, '1360585626_12431415.jpg', '', 'Baseball in the sun', '', '', 1, 'PK-1', 0, NULL),
(21, '1360585732_12431415.jpg', '', 'I Had a Pain in My Head', '', '', 1, 'PK-1', 0, NULL),
(23, '1360585991_12431415.jpg', '', 'The Tail of the Lost Mouse', '', 'Elizabeth', 1, 'PK-1', 6, NULL),
(25, '1360586099_12431415.jpg', '', 'About 5 minutes later', '', '', 3, '4-5', 0, NULL),
(26, '1360586275_12431415.jpg', '', 'I Knew It Was a Snake', '', '', 1, 'PK-1', 0, NULL),
(27, '1360586397_12431415.jpg', '', 'Hey, Charles', '<p>Desc on Hey Charles~</p>', '', 3, '4-5', 0, NULL),
(29, '1365642127_12431310.jpg', '', 'Test', '<p>Testdesc</p>', '', 3, '4-5', 0, NULL),
(50, '1366256160_12431310.jpg', '', 'eeeeeee', '<p>ddddddd</p>', '', 1, 'PK-1', 0, NULL),
(52, '1366259328_12431416.jpg', '', 'WWWWWWWWWWWWWWWWWWWWWWWW', '<p>this is the transcript</p>', 'David Kim', 1, 'PK-1', 10, NULL),
(53, '1366764014_12431409.jpg', '', 'test author, age', '', 'Joe', 2, '2-3', 7, NULL),
(54, '1367109311_12431409.jpg', '', 'Here is another example of a really long title.  What should we set our character limit to?', '', 'Noelle', 1, 'PK-1', 10, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `resource_tags`
--

CREATE TABLE IF NOT EXISTS `resource_tags` (
  `resource_tag_id` int(9) NOT NULL auto_increment,
  `doc_number` int(9) NOT NULL,
  `maintag_id` int(9) NOT NULL,
  `subtag_id` int(9) default NULL,
  PRIMARY KEY  (`resource_tag_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=455 ;

--
-- Dumping data for table `resource_tags`
--

INSERT INTO `resource_tags` (`resource_tag_id`, `doc_number`, `maintag_id`, `subtag_id`) VALUES
(27, 16, 1, 1),
(28, 16, 1, 20),
(29, 16, 2, 3),
(32, 18, 1, 1),
(33, 18, 1, 7),
(37, 20, 4, 5),
(38, 20, 4, 6),
(39, 21, 1, 11),
(40, 21, 1, 15),
(41, 21, 1, 20),
(42, 21, 3, 21),
(51, 25, 1, 20),
(52, 25, 2, 3),
(53, 25, 2, 16),
(167, 19, 2, 3),
(168, 19, 2, 12),
(169, 19, 2, 16),
(170, 19, 3, 4),
(171, 19, 5, 24),
(220, 26, 3, 4),
(221, 26, 3, 17),
(317, 29, 4, 18),
(318, 29, 5, 24),
(324, 50, 1, 1),
(356, 17, 1, 1),
(357, 17, 2, 3),
(358, 17, 3, 4),
(359, 17, 4, 5),
(360, 53, 1, 1),
(361, 23, 2, 16),
(362, 23, 3, 4),
(363, 23, 3, 13),
(434, 27, 1, 1),
(435, 27, 1, 2),
(436, 27, 1, 7),
(437, 27, 1, 9),
(438, 27, 1, 10),
(439, 27, 3, 4),
(440, 27, 3, 13),
(442, 54, 1, 1),
(451, 52, 1, 1),
(452, 52, 1, 2),
(453, 52, 3, 21),
(454, 52, 4, 18);

-- --------------------------------------------------------

--
-- Table structure for table `roser_class`
--

CREATE TABLE IF NOT EXISTS `roser_class` (
  `class_id` int(9) NOT NULL auto_increment,
  `class_code` varchar(32) NOT NULL,
  `class_section` varchar(32) NOT NULL,
  `year` varchar(16) NOT NULL,
  `semester` varchar(16) NOT NULL,
  `teacher_userid` int(9) NOT NULL,
  `teacher_name` varchar(128) NOT NULL,
  `schedule` varchar(64) NOT NULL,
  PRIMARY KEY  (`class_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `roser_class`
--

INSERT INTO `roser_class` (`class_id`, `class_code`, `class_section`, `year`, `semester`, `teacher_userid`, `teacher_name`, `schedule`) VALUES
(1, 'ECW', '2', '2012', 'Fall', 72, 'Gerry Geronimo', 'TTH 10AM-12:30PM'),
(2, 'ECSW', '1', '2012', 'Fall', 102, 'Dan Small', 'TTH 1:30-3:30PM'),
(3, 'ECW', '1', '2011', 'Spring', 135, 'Max Colvin', 'MWF 2-4PM'),
(4, 'ECSW', '2', '2012', 'Fall', 38, 'Tom Robertson', 'TTH 9:30-11:30AM'),
(5, 'ECCW', '2', '2012', 'Fall', 158, 'Alexa Bell', 'MWF 8-10AM'),
(6, 'ECCW', '3', '2012', 'Fall', 146, 'Janna Jones', 'TTH 9:30-11:30AM'),
(7, 'ECSW', '3', '2012', 'Fall', 145, 'Mandy Wilcox', 'MWF 2-4PM'),
(8, 'ECCW', '1', '2012', 'Fall', 144, 'Sandy Wen', 'TTH 1:30-3:30PM'),
(9, 'ECCW', '4', '2012', 'Fall', 141, 'Jeremy Chen', 'TTH 11:30AM-1:30PM'),
(10, 'ECW', '1', '2012', 'Fall', 153, 'Diane Kohl', 'MWF 10AM-12:30PM'),
(11, 'ECSW', '3', '2011', 'Fall', 143, 'Amalia Fuentes', 'MWF 12:30-2:30PM'),
(12, 'ECSW', '2', '2011', 'Fall', 63, 'Ellen Kan', 'TTH 9:30-11:30AM'),
(13, 'ECSW', '1', '2011', 'Fall', 38, 'Tom Robertsons', 'MWF 10am-12:30pm'),
(14, 'ECSW', '1', '2012', 'Spring', 102, 'Dan Small', 'TTH 10am-12:30pm'),
(15, 'ECSW', '2', '2012', 'Spring', 72, 'Gerry Geronimo', 'MWF 10am-12:30pm'),
(16, 'ddd', 'eee', '2012', 'Fall', 158, 'Alexa Bell', 'fff'),
(17, 'aaa', 'bbb', '2015', 'Fall', 163, 'Sarah Teacher', 'ccc'),
(18, '111', '111', '2013', 'Fall', 162, 'David_Student Kim', '111'),
(19, 'class title', '02', '2013', 'Spring', 145, 'Mandy Wilcox', 'mwf 10-11'),
(20, 'Mulitmodal instruction', 'EDU888', '2014', 'Spring', 158, 'Alexa Bell', 'Mon-Thurs; 6-8am'),
(21, 'Sweany Class', 'aaa', '2013', 'Spring', 165, 'Noelle Sweany', 'bbb'),
(22, 'test', 'test section', '2013', 'Spring', 170, 'David_teacher Kim', 'test schedule'),
(23, 'Multimodal', 'EDC888', '2014', 'Spring', 169, 'Jon Douu', 'Mon & Thurs 3-6'),
(24, 'MadeUpTitle', 'EDU213', '2014', 'Fall', 169, 'Jon Douu', 'mon-sat 6am-6pm');

-- --------------------------------------------------------

--
-- Table structure for table `roser_comments`
--

CREATE TABLE IF NOT EXISTS `roser_comments` (
  `comment_id` int(12) NOT NULL auto_increment,
  `comment_postid` int(12) NOT NULL,
  `comment_date` date NOT NULL,
  `comment_time` time NOT NULL,
  `comment_userid` int(9) NOT NULL,
  `comment_comments` varchar(1024) NOT NULL,
  PRIMARY KEY  (`comment_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=40 ;

--
-- Dumping data for table `roser_comments`
--

INSERT INTO `roser_comments` (`comment_id`, `comment_postid`, `comment_date`, `comment_time`, `comment_userid`, `comment_comments`) VALUES
(1, 1, '2012-07-30', '14:01:21', 88, 'good cursive handwriting'),
(2, 2, '2012-07-27', '14:01:21', 73, 'expressive with drawings'),
(3, 3, '2012-07-30', '14:03:56', 106, 'good cursive handwriting. Too bad.  The scanned image is not so clear'),
(4, 4, '2012-07-24', '14:05:38', 86, 'Good cursive writing'),
(5, 5, '2012-07-26', '14:06:24', 102, 'Good writing.'),
(6, 6, '2012-07-30', '14:07:48', 72, 'Drawing emphasized the words written.'),
(7, 7, '2012-07-27', '14:09:49', 88, 'good use of stick people drawing'),
(8, 8, '2012-07-24', '14:12:08', 73, 'well-written (we won).'),
(9, 9, '2012-07-31', '14:13:16', 106, 'Good imagination.'),
(10, 10, '2012-07-20', '14:14:30', 86, 'Good narration of a past event'),
(11, 11, '2012-07-17', '14:19:48', 102, 'Good handwriting within the lines.'),
(12, 12, '2012-07-26', '14:21:17', 72, 'Cursive writing is very good.'),
(13, 13, '2012-07-18', '14:22:10', 88, 'well-written'),
(14, 14, '2012-07-23', '14:24:20', 73, 'Good representation of early writing'),
(15, 15, '2012-07-31', '14:25:01', 106, 'Make use of drawing for expressing thoughts'),
(16, 16, '2012-07-30', '14:26:39', 86, 'Drawing was used for expression'),
(17, 17, '2012-07-18', '14:27:18', 102, 'Lots of drawings'),
(18, 18, '2012-07-30', '14:28:18', 72, 'Precursor to handwriting'),
(19, 19, '2012-07-31', '14:29:15', 88, 'Good handwriting'),
(20, 20, '2012-07-25', '14:29:43', 73, 'handwriting is good'),
(21, 21, '2012-07-27', '14:30:51', 106, 'Draws audience to content'),
(22, 22, '2012-07-24', '14:31:33', 86, 'Good content.'),
(23, 23, '2012-07-25', '14:31:58', 102, 'Good use of words and drawings'),
(24, 24, '2012-07-25', '14:38:20', 72, 'Creative use of letters'),
(25, 25, '2012-07-31', '14:38:58', 88, 'Very creative and colorful'),
(26, 26, '2012-07-25', '14:40:46', 73, 'good presentation'),
(27, 27, '2012-07-23', '14:42:19', 106, 'good presentation'),
(28, 28, '2012-07-31', '14:42:55', 86, 'Good layout'),
(29, 29, '2012-07-17', '14:44:06', 102, 'Sentence sequence is good.'),
(30, 30, '2012-07-18', '14:44:59', 72, 'Expression and sequence of thoughts are good'),
(31, 31, '2012-07-16', '14:48:04', 73, 'Good arrangement '),
(32, 32, '2012-07-31', '14:48:29', 88, 'good presentation'),
(33, 33, '2012-07-30', '14:49:10', 106, 'Expression of thought is good'),
(34, 34, '2012-07-30', '14:49:10', 86, 'Good representation of conversation'),
(35, 35, '2012-07-31', '14:50:24', 73, 'well-drawn'),
(36, 36, '2012-07-16', '14:51:32', 88, 'Drawing presents good understanding of content'),
(37, 37, '2012-07-31', '16:35:23', 106, 'developed handwriting'),
(38, 38, '2012-07-18', '16:36:03', 86, 'Good use of drawing'),
(39, 39, '2012-07-23', '16:36:58', 88, 'well-written thoughts');

-- --------------------------------------------------------

--
-- Table structure for table `roser_posts`
--

CREATE TABLE IF NOT EXISTS `roser_posts` (
  `post_id` int(12) NOT NULL auto_increment,
  `post_docid` int(9) NOT NULL,
  `post_date` date NOT NULL,
  `post_time` time NOT NULL,
  `post_userid` int(9) NOT NULL,
  `post_classid` int(9) NOT NULL,
  `post_topic` varchar(1024) NOT NULL,
  `post_restricted` tinyint(1) NOT NULL,
  PRIMARY KEY  (`post_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=40 ;

--
-- Dumping data for table `roser_posts`
--

INSERT INTO `roser_posts` (`post_id`, `post_docid`, `post_date`, `post_time`, `post_userid`, `post_classid`, `post_topic`, `post_restricted`) VALUES
(1, 1, '2012-07-30', '14:01:21', 86, 2, 'Handwriting', 0),
(2, 2, '2012-07-27', '14:01:21', 72, 1, 'Content', 0),
(3, 3, '2012-07-30', '14:03:56', 72, 1, 'Handwriting', 0),
(4, 4, '2012-07-24', '14:05:38', 72, 1, 'Handwriting', 0),
(5, 1, '2012-07-26', '14:06:24', 106, 1, 'Handwriting', 0),
(6, 1, '2012-07-30', '14:07:48', 72, 1, 'Content', 0),
(7, 2, '2012-07-27', '14:09:49', 102, 2, 'Drawings', 0),
(8, 2, '2012-07-24', '14:12:08', 88, 1, 'Handwriting', 0),
(9, 3, '2012-07-31', '14:13:16', 86, 2, 'Content', 0),
(10, 3, '2012-07-20', '14:14:30', 73, 2, 'Content', 0),
(11, 4, '2012-07-17', '14:19:48', 102, 2, 'Handwriting', 0),
(12, 4, '2012-07-26', '14:21:17', 106, 1, 'Handwriting', 0),
(13, 4, '2012-07-18', '14:22:10', 86, 2, 'Handwriting', 0),
(14, 5, '2012-07-23', '14:24:20', 102, 2, 'Handwriting', 0),
(15, 5, '2012-07-31', '14:25:01', 88, 1, 'Content', 0),
(16, 5, '2012-07-30', '14:26:39', 73, 2, 'Content', 0),
(17, 5, '2012-07-18', '14:27:18', 106, 1, 'Content', 0),
(18, 5, '2012-07-30', '14:28:18', 72, 1, 'Handwriting', 0),
(19, 6, '2012-07-31', '14:29:15', 102, 2, 'Handwriting', 0),
(20, 6, '2012-07-25', '14:29:43', 106, 1, 'Handwriting', 0),
(21, 6, '2012-07-27', '14:30:51', 88, 1, 'Content', 0),
(22, 6, '2012-07-24', '14:31:33', 86, 2, 'Content', 0),
(23, 6, '2012-07-25', '14:31:58', 73, 2, 'Content', 0),
(24, 7, '2012-07-25', '14:38:20', 102, 2, 'Content', 0),
(25, 7, '2012-07-31', '14:38:58', 86, 2, 'Content', 0),
(26, 7, '2012-07-25', '14:40:46', 88, 1, 'Content', 0),
(27, 8, '2012-07-23', '14:42:19', 73, 2, 'Content', 0),
(28, 8, '2012-07-31', '14:42:55', 102, 2, 'Content', 0),
(29, 8, '2012-07-17', '14:44:06', 88, 1, 'Content', 0),
(30, 8, '2012-07-18', '14:44:59', 86, 2, 'Content', 0),
(31, 9, '2012-07-16', '14:48:04', 72, 1, 'Content', 0),
(32, 9, '2012-07-31', '14:48:29', 106, 1, 'Content', 0),
(33, 9, '2012-07-30', '14:49:10', 86, 2, 'Content', 0),
(34, 10, '2012-07-30', '14:49:10', 102, 2, 'Drawings', 0),
(35, 10, '2012-07-31', '14:50:24', 72, 1, 'Drawings', 0),
(36, 10, '2012-07-16', '14:51:32', 73, 2, 'Drawings', 0),
(37, 1, '2012-07-31', '16:35:23', 102, 2, 'Handwriting', 0),
(38, 1, '2012-07-18', '16:36:03', 88, 1, 'Content', 0),
(39, 1, '2012-07-23', '16:36:58', 73, 2, 'Content', 0);

-- --------------------------------------------------------

--
-- Table structure for table `roser_students`
--

CREATE TABLE IF NOT EXISTS `roser_students` (
  `student_id` int(9) NOT NULL auto_increment,
  `class_idno` int(9) NOT NULL,
  `user_idno` int(9) NOT NULL,
  `authorized` tinyint(1) NOT NULL,
  PRIMARY KEY  (`student_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=90 ;

--
-- Dumping data for table `roser_students`
--

INSERT INTO `roser_students` (`student_id`, `class_idno`, `user_idno`, `authorized`) VALUES
(2, 1, 160, 0),
(3, 2, 73, 1),
(4, 3, 74, 1),
(5, 2, 75, 0),
(6, 1, 78, 1),
(7, 2, 79, 0),
(8, 2, 80, 1),
(9, 1, 81, 1),
(11, 1, 83, 0),
(12, 3, 84, 0),
(13, 1, 85, 0),
(14, 2, 86, 1),
(15, 2, 87, 1),
(16, 1, 88, 1),
(17, 1, 89, 0),
(18, 2, 90, 0),
(19, 1, 91, 0),
(20, 3, 92, 0),
(21, 3, 93, 0),
(22, 3, 94, 0),
(23, 1, 95, 0),
(24, 2, 96, 0),
(25, 1, 97, 0),
(26, 3, 98, 1),
(29, 1, 100, 1),
(30, 1, 101, 0),
(31, 2, 103, 0),
(32, 2, 105, 0),
(33, 1, 106, 1),
(34, 3, 108, 1),
(35, 2, 109, 0),
(36, 2, 111, 0),
(37, 2, 112, 0),
(40, 2, 113, 0),
(42, 1, 114, 0),
(45, 4, 82, 0),
(47, 4, 116, 1),
(48, 4, 118, 1),
(50, 4, 119, 0),
(52, 2, 120, 0),
(54, 4, 121, 0),
(55, 4, 122, 0),
(56, 4, 115, 0),
(58, 1, 123, 0),
(59, 4, 124, 0),
(63, 4, 154, 0),
(64, 2, 99, 0),
(68, 4, 160, 0),
(69, 16, 162, 1),
(70, 17, 164, 1),
(71, 17, 160, 1),
(72, 17, 60, 1),
(73, 18, 162, 1),
(74, 19, 166, 0),
(75, 18, 166, 0),
(76, 16, 166, 0),
(77, 20, 166, 0),
(78, 8, 166, 0),
(79, 3, 165, 0),
(80, 21, 167, 0),
(81, 20, 168, 0),
(82, 21, 168, 0),
(83, 23, 168, 0),
(84, 22, 162, 1),
(85, 24, 168, 1),
(86, 23, 171, 0),
(87, 24, 171, 1),
(88, 24, 172, 0),
(89, 23, 169, 0);

-- --------------------------------------------------------

--
-- Table structure for table `roser_user`
--

CREATE TABLE IF NOT EXISTS `roser_user` (
  `user_id` int(9) unsigned NOT NULL auto_increment,
  `username` varchar(128) NOT NULL,
  `userlevel` int(2) NOT NULL,
  `firstname` varchar(128) NOT NULL,
  `lastname` varchar(128) NOT NULL,
  `fullname` varchar(256) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `reg_time` varchar(16) NOT NULL,
  PRIMARY KEY  (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=174 ;

--
-- Dumping data for table `roser_user`
--

INSERT INTO `roser_user` (`user_id`, `username`, `userlevel`, `firstname`, `lastname`, `fullname`, `email`, `password`, `reg_time`) VALUES
(0, 'landerson', 1, 'Linda', 'Anderson', 'Linda Anderson', 'lwang@gmail.com', 'feb226ac67773436664fc981a84e456b', '838:59:59'),
(3, 'jxavier', 1, 'James', 'Xavier', 'James Xavier', 'jwang@gmail.com', '4406af98de3abe3ecaca0d50bf5c84d6', '16:55:13'),
(4, 'joerubio', 1, 'Joe', 'Rubio', 'Joe Rubio', 'joewang@gmail.com', 'f81e178d6809308f4da51e6c15b59385', '16:55:20'),
(10, 'bwang', 1, 'Bob', 'Patton', 'Bob Patton', 'bwang@yahoo.com', '8667868ae625b8192548793ae867bcfb', '16:55:39'),
(11, 'mikewang', 1, 'Matt', 'Larson', 'Matt Larson', 'mikewang@yahoo.com', '35ed45b12b9f05125b28d922cde8574e', '838:59:59'),
(12, 'miwang', 1, 'Melody', 'Davidson', 'Melody Davidson', 'miwang@gmail.com', '6cfbc60a94f3987aee4ccc8c44653d1a', '838:59:59'),
(13, 'mywang', 1, 'Mary', 'Holt', 'Mary Holt', 'mywang@yahoo.com', 'af6c7b6ef933bb32dc710fc8f98de39e', '00:00:00'),
(14, 'jowang', 1, 'Joseph', 'Carson', 'Joseph Carson', 'jowang@yahoo.com', '8237c849f77e854d497db0d22587d49f', '838:59:59'),
(15, 'mkwang', 1, 'Karen', 'Campbell', 'Karen Campbell', 'mkwang@yahoo.com', '1e42255b206bc21b984c0952d7bd42b9', '838:59:59'),
(16, 'mewang', 1, 'Nathan', 'Bush', 'Nathan Bush', 'mewang@gmail.com', '2bd58c77916ffeb28ce845945883b286', '00:00:00'),
(17, 'jnwang', 1, 'Daniel', 'Goldman', 'Daniel Goldman', 'jnwang@yahoo.com', '870882339987fbdc76cca30d2bea3018', '00:00:00'),
(18, 'bzwang', 1, 'Benny', 'Gonzales', 'Benny Gonzales', 'bzwang@hotmail.com', 'fc123d3f666197e8cbac4fa2bdcdad27', '00:00:00'),
(19, 'chwang', 9, 'Charo', 'Wang', 'Charo Wang', 'chwang@gmail.com', 'f76b36a61087f3ff2261bc1ef98311c8', '838:59:59'),
(20, 'bawang', 1, 'Bardo', 'Hernandez', 'Bardo Hernandez', 'bawang@gmail.com', 'f4ca99d62c2b7f0acbbde59c6c1f4606', '838:59:59'),
(22, 'crwang', 1, 'Christine', 'Imez', 'Christine Imez', 'crwang@gmail.com', '933e994cffcb82fec759dd608ed5ba70', '00:00:00'),
(23, 'awang', 1, 'Kaitlyn', 'Madison', 'Kaitlyn Madison', 'awang@gmail.com', '169310599c027baea46c6bf3724ce0f6', '00:00:00'),
(24, 'dwang', 1, 'Jill', 'Vinson', 'Jill Vinson', 'dwang@gmail.com', '66bb41796509221f90fc5914d2526cb2', '00:00:00'),
(25, 'ewang', 1, 'Peter', 'Daniels', 'Peter Daniels', 'ewang@gmail.com', 'bae81d8703b72e086d268e1dc2e35fc1', '00:00:00'),
(26, 'fwang', 1, 'Fred', 'Yep', 'Fred Yep', 'fwang@gmail.com', '0bcb282329d5939e2d317a46be033c24', '00:00:00'),
(27, 'gwang', 1, 'Gerry', 'Yowell', 'Gerry Yowell', 'gwang@gmail.com', '91bfa85e5204b5806d536a098caacd31', '00:00:00'),
(28, 'hwang', 1, 'Helen', 'Xu', 'Helen Xu', 'hwang@gmail.com', 'a8fe2d07e96298b7c6c65ca9ded0d954', '00:00:00'),
(29, 'iwang', 1, 'Irene', 'Thomas', 'Irene Thomas', 'iwang@gmail.com', '87117b685fcd6e0e224036c057380829', '00:00:00'),
(30, 'kwang', 1, 'Kevin', 'Lee', 'Kevin Lee', 'kwang@gmail.com', '54605f62d37ef9159df9fbcfa0523a7c', '00:00:00'),
(32, 'nwang', 1, 'Nora', 'Mendoza', 'Nora Mendoza', 'nwang@gmail.com', '2cc7573cb39eb5cec1685a8cfa45c14a', '00:00:00'),
(33, 'owang', 1, 'Oliver', 'Nunez', 'Oliver Nunez', 'owang@gmail.com', '2ce3587fb2f9e7fccffdd680212a9cd2', '838:59:59'),
(34, 'tnorman', 1, 'Tony', 'Norma', 'Tony Norma', 'tnorman@gmail.com', 'fd2bb3511577cff554e93d83ca7fc56a', '838:59:59'),
(35, 'qwang', 1, 'Ryan', 'Quartz', 'Ryan Quartz', 'qwang@gmail.com', 'be61672b04c70504993c63bfa410689f', '838:59:59'),
(36, 'rwang', 1, 'Vicky', 'Windsor', 'Vicky Windsor', 'rwang@gmail.com', 'a5e2bdb171f975ecb291ca39d22f052f', '838:59:59'),
(37, 'swang', 1, 'Sally', 'Preston', 'Sally Preston', 'swang@gmail.com', '5840e2cbda31b42dabd280e8df964a44', '1340911875'),
(38, 'troberts', 2, 'Tom', 'Robertsons', 'Tom Robertsons', 'trobert@outlook.com', '4c60f99866268f7a1408dba7662fb4bd', '1340912121'),
(39, 'uwang', 1, 'Ursula', 'Reyes', 'Ursula Reyes', 'uwang@gmail.com', '06e9b4052e3be93fe8dbb6a9a9c872fa', '1340912430'),
(40, 'vwang', 1, 'Vera', 'Jennings', 'Vera Jennings', 'vwang@gmail.com', '52f7f404700a13897520f3dbd8a35324', '1340913063'),
(41, 'wang', 1, 'John', 'Jenkinson', 'John Jenkinson', 'wwang@gmail.com', '86e43f2eb61ad0e607bd907438a10440', '1340913833'),
(42, 'xwang', 1, 'Luke', 'Quiznoz', 'Luke Quiznos', 'xwang@gmail.com', 'd4800e9247b7f576ba3fbed839db9824', '1340913966'),
(43, 'ywang', 1, 'Mia', 'Zinn', 'Mia Zinn', 'ywang@gmail.com', '8a2597aa1d37d432a88a446d82b6561e', '1340914340'),
(44, 'zwang', 1, 'Alie', 'Ianni', 'Alie Ianni', 'zwang@gmail.com', '13c0dc6645297a03e64de5dc582ccb4e', '1340915169'),
(45, 'aawang', 1, 'Aaron', 'Mills', 'Aaron Mills', 'aawang@gmail.com', 'd26edf15ffb437ba3f94528197eeded4', '1340915476'),
(46, 'abwang', 1, 'Andrew', 'Thomson', 'Andrew Thomson', 'abwang@gmail.com', 'c7cdfc8ee884371a6e1879e5779fd439', '1340915608'),
(47, 'acwang', 1, 'Catherine', 'Mead', 'Catherine Mead', 'acwang@gmail.com', '286fd8804b65ef2f5b87753ec6ecb1f4', '1340916443'),
(48, 'adwang', 1, 'Daniel', 'Franklin', 'Daniel Franklin', 'adwang@gmail.com', '12bc7a7653bbab1ba498469d359c5e5a', '1340916605'),
(49, 'aewang', 1, 'Eric', 'Ferrel', 'Eric Ferrel', 'aewang@gmail.com', '378baf2b3cf01a9489cdf08190d08083', '1340918982'),
(50, 'afwang', 1, 'Frank', 'Esteban', 'Frank Esteban', 'afwang@gmail.com', 'd2b29df27f1a4a904c62ccee2ee67d76', '1340982154'),
(51, 'agwang', 1, 'Gina', 'Nee', 'Gina Nee', 'agwang@gmail.com', '31e98ffc5a458595678f4a4a0c21d393', '1340982219'),
(52, 'ahwang', 1, 'Holly', 'Franks', 'Holly Franks', 'ahwang@gmail.com', '77a9e56303e7e8edeee17fd5515abffe', '1340982680'),
(53, 'aiwang', 1, 'Allison', 'Stein', 'Allison Stein', 'aiwang', '7c727e218fc98cefea195010592b3594', '1340983335'),
(54, 'ajwang', 1, 'Jackson', 'Olson', 'Jackson Olson', 'ajwang@gmail.com', '04c0590a50cb538ca7e17adb8debaffe', '1340983707'),
(55, 'alwang', 1, 'Jonathan', 'Eaton', 'Jonathan Eaton', 'alwang@gmail.com', '255ac3ec0fb68591121c1eb2cea94af6', '1340986268'),
(56, 'akwang', 1, 'Ethan', 'Thaddeus', 'Ethan Thaddeus', 'akwang@gmail.com', '5c9b3bc2bac3cc233e8649cb0f5f37f4', '1340986542'),
(57, 'amwang', 1, 'Aiden', 'Oscar', 'Aiden Oscar', 'amwang@gmail.com', '4f252fb4372de2ccb88b2902f1b71429', '1340987308'),
(58, 'anwang', 1, 'Laurel', 'Bernard', 'Laurel Bernard', 'anwang@gmail.com', 'e55cfdbb3aa2dcc28beb12455ed40b79', '1340991775'),
(59, 'aowang', 1, 'Olive', 'Lawson', 'Olive Lawson', 'aowang@gmail.com', 'fe16aa9b72356ae16e0edf55acd8635b', '1340991869'),
(60, 'david', 9, 'David', 'Kim', 'DavidKim', 'david.kim@austin.utexas.edu', '0c11f3b6b21cc7e29c524f40c446bc66', '1340992556'),
(61, 'apwang', 9, 'ap', 'wang', 'apwang', 'apwang@gmail.com', '62430568546af53cfb293c7fd94eb846', '1341258043'),
(63, 'atwang', 2, 'Ellen', 'Kan', 'Ellen Kan', 'atwang@gmail.com', '05003480a5e6d7a7f4687bbef81a636d', '1341265010'),
(64, 'auwang', 1, 'Dennis', 'Bryant', 'Dennis Bryant', 'auwang@gmail.com', '9c24b7dc2fcda96f6f23ec5047e95cb6', '1341265379'),
(66, 'axwang', 1, 'Alex', 'Hall', 'Alex Hall', 'axwang@gmail.com', '124c3261c13879480a18487989398043', '1341265765'),
(67, 'awwang', 1, 'Matthew', 'Ards', 'Matthew Ards', 'awwang@gmail.cn', '228f82923c185c8f6727630942d70bec', '1341336513'),
(68, 'aywang', 1, 'Mary', 'Yandall', 'Mary Yandall', 'aywang@gmail.com', '8a4d69f7990a5f07f240a0ef9eea2730', '1341340500'),
(69, 'azwang', 9, 'Becca', 'Wang', 'Becca Wang', 'azwang@gmail.cn', 'a6e0f18b80170b6d398e7dccbcf3b14e', '1341340984'),
(70, 'aaawang', 1, 'Tina', 'Zecharias', 'Tina Zecharias', 'aaawang@gmail.com', 'd15749c1e6885fe9bd4ce4be7717ed0f', '1343750434'),
(72, 'ggeronimo', 1, 'Gerry', 'Geronimo', 'Gerry Geronimo', 'ggeronimo@gmail.com', 'b8bff3c4b31ff4d3618217218599bf68', '1345149719'),
(73, 'nbaldwin', 1, 'Nicole', 'Baldwin', 'Nicole Baldwin', 'nbaldwin@gmail.com', '32c6eded38d046433a2436802efd3b82', '1345149767'),
(74, 'esimms', 1, 'Erica', 'Simms', 'Erica Simms', 'esimms@gmail.com', '95671de134224f2176cc79509d66ce89', '1345149797'),
(75, 'csmith', 1, 'Chris', 'Smith', 'Chris Smith', 'csmith@gmail.com', 'eea05b6af6161fe5e978f1f1b1ce226a', '1345149833'),
(76, 'sarahlim', 1, 'Sarah', 'Lim', 'Sarah Lim', 'slim@gmail.com', '29e6bf333ff84c8acc93ed64dea849f7', '1345149873'),
(78, 'sescobar', 1, 'Steve', 'Escobar', 'Steve Escobar', 'sescobar@gmail.com', '75e68a927ba921e18dc31cdb3adaa563', '1345149960'),
(79, 'fviviani', 1, 'Fiona', 'Viviani', 'Fiona Viviani', 'fviviani@gmail.com', '50005143041a9041247f2cf7a8aa3d92', '1345150009'),
(80, 'sball', 1, 'Sophia', 'Ball', 'Sophia Ball', 'sball@yahoo.com', '74135087c38ae112e18419e9191592d8', '1345150082'),
(81, 'tjackson', 1, 'Tim', 'Jackson', 'Tim Jackson', 'tjackson@yahoo.com', 'ba6fe58a308b28af6f42dd88c06c3b8c', '1345150135'),
(82, 'cmonte', 1, 'Cynthia', 'Monte', 'Cynthia Monte', 'cmonte@gmail.com', '473051b7149eef47b53cf62b9c6f8908', '1345150165'),
(83, 'jvaldez', 1, 'Jasmine', 'Valdez', 'Jasmine Valdez', 'jvaldez@yahoo.com', '1221fbfad8855f28fa2200fc7bfcf4c7', '1345150210'),
(84, 'ajohnsen', 1, 'Allan', 'Johnsen', 'Allan Johnsen', 'ajohnsen@gmail.com', '55417080f92c86b280a3d457343f2b3e', '1345150245'),
(85, 'bshelley', 1, 'Brad', 'Shelley', 'Brad Shelley', 'bshelley@gmail.com', '7c98d701824eb661f792f6f57dbb829b', '1345150305'),
(86, 'Adenney', 1, 'Anna', 'Denney', 'Anna Denney', 'adenney@gmail.com', '11ad3e2611a3c8bb60f7d7c39456cff5', '1345150348'),
(87, 'tjones', 1, 'Tiffany', 'Jones', 'Tiffany Jones', 'tjones@gmail.com', 'ae23ebf57845e0911b3ba3046a9069e0', '1345150374'),
(88, 'mcupeles', 1, 'Maya', 'Cupeles', 'Maya Cupeles', 'mcupeles@gmail.com', 'cb96e301519d5df568c7f038bc8148b2', '1345150452'),
(89, 'bpowers', 1, 'Barbie', 'Powers', 'Barbie Powers', 'bpowers@gmail.com', '50cb680f7ec5a25373e867a9fb0523d1', '1345150487'),
(90, 'swise', 1, 'Sally', 'Wise', 'Sally Wise', 'swise@gmail.com', '49cfa30a899a9aa4e8c32b7d6ee58e30', '1345150869'),
(91, 'erogers', 1, 'Eric', 'Rogers', 'Eric Rogers', 'erogers@yahoo.com', '3603872ff2bef7a7146c91c24babea17', '1345150897'),
(92, 'jwiley', 1, 'James', 'Wiley', 'James Wiley', 'jwiley@gmail.com', '273974c75634723725b8fb4edfe72b92', '1345150982'),
(93, 'kkennard', 1, 'Kelly', 'Kennard', 'Kelly Kennard', 'kkennard@gmail.com', '80e0242cabeca8f73977fe4a63aed3fd', '1345151010'),
(94, 'roreilly', 1, 'Rick', 'Oreilly', 'Rick Oreilly', 'roreilly@gmail.com', '60ddf5bcc045c189d5e2316dcfdeddd3', '1345151036'),
(95, 'tjennings', 1, 'Tom', 'Jennings', 'Tom Jennings', 'tjennings@gmail.com', 'e3c88ab56f2aa57160a2d32e848c4f0a', '1345151072'),
(96, 'llemay', 1, 'Laura', 'Lemay', 'Laura Lemay', 'llemay@yahoo.com', '4d8f0206a329191bc9b792ed64229d89', '1345151099'),
(97, 'aweiss', 1, 'April', 'Weiss', 'April Weiss', 'aweiss@gmail.com', 'aecb27182a78c2ea3842bbfe053b01d3', '1345151130'),
(98, 'aholland', 1, 'Agnes', 'Holland', 'Agnes Holland', 'aholland@gmail.com', '46840aded1a9755833d3b7d876d3b6a2', '1345151155'),
(99, 'lduering', 1, 'Linda', 'Duering', 'Linda Duering', 'lduering@yahoo.com', '048b371b0cf81974e35569fb6e2626d0', '1345151193'),
(100, 'rhouse', 1, 'Richard', 'House', 'Richard House', 'rhouse@gmail.com', '9a0326bc82dd32d99ad668f598c9af26', '1345151225'),
(101, 'mhunter', 1, 'Missy', 'Hunter', 'Missy Hunter', 'mhunter@gmail.com', '97491c10175c4bd89a5dbd18dad46d6b', '1345151338'),
(102, 'dsmall', 2, 'Dan', 'Small', 'Dan Small', 'dsmall@yahoo.com', 'f958555eb4d5e51226011b2012b07b4d', '1345151362'),
(103, 'arocha', 1, 'Arnold', 'Rocha', 'Arnold Rocha', 'arocha@gmail.com', 'af90651bd29eb16ba00d36729cb8df38', '1345151409'),
(104, 'kharris', 1, 'Kayla', 'Harris', 'Kayla Harris', 'kharris@gmail.com', '250e2d4e070b9763f4952e60da1e0602', '1345151441'),
(105, 'jlin', 1, 'Jenna', 'Lin', 'Jenna Lin', 'jlin@gmail.com', '4a9c940e9f4128afeafefc6b75ab68a6', '1345151464'),
(106, 'pcastaneda', 1, 'Perry', 'Castaneda', 'Perry Castaneda', 'pcastaneda@gmail.com', '585353dfb4c8defb7fcaf2ed647bc0bb', '1345151499'),
(108, 'aacebedo', 9, 'Abel', 'Acebedo', 'Abel Acebedo', 'aacebedo@gmail.com', '43952b18b4e3e4d85ded7f6eb6a60d6c', '1345151556'),
(109, 'ataylor', 1, 'Annie', 'Taylor', 'Annie Taylor', 'ataylor@gmail.com', 'ff558e2a3c18fed901b2f5eb434eff24', '1345151601'),
(111, 'equinn', 1, 'Evelyn', 'Quinn', 'Evelyn Quinn', 'equinn@gmail.com', '0e0a55ebc33c67967c8d482e9aafa4f6', '1345151832'),
(112, 'mmarks', 1, 'Mike', 'Marks', 'Mike Marks', 'mmarks@yahoo.com', '4e410f611140aac3c6c13c93ae805584', '1345151885'),
(113, 'ewu', 1, 'Eliza', 'Wu', 'Eliza Wu', 'ewu@gmail.com', '6351676416a157a7ba098aa0662d9496', '1345151921'),
(114, 'awinston', 1, 'Ashley', 'Winston', 'Ashley Winston', 'awinston@gmail.com', '9268304ae74720b67da813fb76a61828', '1345151951'),
(115, 'cqueen', 1, 'Camille', 'Queen', 'Camille Queen', 'cqueen@gmail.com', '6e5392520c949725ec904db4f219d109', '1345152005'),
(116, 'lgraham', 1, 'Liza', 'Graham', 'Liza Graham', 'lgraham@gmail.com', 'a6d7b39c5c2c8b351ca4f83f8f90cda1', '1345152053'),
(118, 'jnewton', 1, 'John', 'Newton', 'John Newton', 'jnewton@gmail.com', 'ec3152edd04a8fa3a329522d7af9be2e', '1345152115'),
(119, 'badams', 9, 'Benjamin', 'Adams', 'Benjamin Adams', 'badams@gmail.com', '0d04b853bc37e39cc8e806af68e6aee9', '1345152141'),
(120, 'nsingh', 1, 'Nadia', 'Singh', 'Nadia Singh', 'nsingh@gmail.com', '75f47998447c30bccfb0ce9ccc95b288', '1345152182'),
(121, 'dnguyen', 1, 'Debbie', 'Nguyen', 'Debbie Nguyen', 'dnguyen@gmail.com', '422e0751100deb13348369f23eb196e2', '1345152215'),
(122, 'amiramonte', 1, 'Abigail', 'Miramonte', 'Abigail Miramonte', 'amiramonte@gmail.com', '5fdd73672fdfce526027f817112681ea', '1345152244'),
(123, 'ckocurek', 1, 'Carrie', 'Kocurek', 'Carrie Kocurek', 'ckocurek@gmail.com', '213e8848781a4280b48a0071aed21465', '1345152300'),
(124, 'tchong', 1, 'Timothy', 'Chong', 'Timothy Chong', 'tchong@gmail.com', '6a381923cfc611c206cb4b5b9a375f01', '1345152330'),
(125, 'jwong', 1, 'Joshua', 'Wong', 'Joshua Wong', 'jwong@gmail.com', 'd4b76492de91dac6a581260bef5abfd1', '1345152368'),
(126, 'rchai', 1, 'Rebecca', 'Chai', 'Rebecca Chai', 'rchai@gmail.com', '5487e0cd35473cb4fca2dee0cb2cf2b4', '1345152396'),
(127, 'hakins', 1, 'Hannah', 'Akins', 'Hannah Akins', 'hakins@gmail.com', '3de13a60fa14d7143215869ad5b538fe', '1345152437'),
(128, 'jmannings', 1, 'Joanna', 'Mannings', 'Joanna Mannings', 'jmannings@hotmail.com', '81ac1563b27a517a46acb885155614a2', '1345152479'),
(129, 'ghan', 1, 'Grace', 'Han', 'Grace Han', 'ghan@gmail.com', 'dd4bc586715de9c127684f233ee975c3', '1345152512'),
(130, 'mbrown', 1, 'Mitzi', 'Brown', 'Mitzi Brown', 'mbrown@gmail.com', '513c87ffe93c3f82ba17a0881e459d60', '1345152553'),
(131, 'eseidner', 1, 'Esther', 'Seidner', 'Esther Seidner', 'eseidner@gmail.com', '6c1d6c3653ff7d410eae425055a0420a', '1345152617'),
(132, 'agreene', 1, 'Audrey', 'Greene', 'Audrey Greene', 'agreene@hotmail.com', '5fbc571c8642e8f7749902b202cc2d12', '1345152644'),
(133, 'Atroy', 1, 'Aubrey', 'Troy', 'Aubrey Troy', 'atroy@gmail.com', 'b2dae3c6cf87f01d47780d548f2e40ad', '1345152670'),
(134, 'lcolvin', 1, 'Luke', 'Colvin', 'Luke Colvin', 'lcolvin@gmail.com', 'a433ee71b9439df2843e8ddfcc03db5e', '1345154589'),
(135, 'mcolvin', 2, 'Max', 'Colvin', 'Max Colvin', 'mcolvin@gmail.com', '16f7f7b75b3e95eee7200dbebe4a2576', '1345210571'),
(136, 'nfox', 1, 'Nikki', 'Fox', 'Nikki Fox', 'nfox@gmail.com', '2d2ac19e453238aeb762088cb14ae395', '1345210602'),
(137, 'aatkins', 1, 'Aida', 'Atkins', 'Aida Atkins', 'aatkins@gmail.com', '41f0d61982411cce30b73bbcbddc4a6e', '1345210626'),
(138, 'lross', 1, 'Lydia', 'Ross', 'Lydia Ross', 'lross@gmail.com', '288cb9efa0a6eab89db6ad7f28f67c15', '1345210648'),
(139, 'mcollins', 2, 'Matthew', 'Collins', 'Matthew Collins', 'mcollins@gmail.com', 'c582d0c5cfb45397e6ffb07e2e9f1c40', '1345210675'),
(140, 'dcole', 2, 'David', 'Cole', 'David Cole', 'dcole@gmail.com', '5d13301a3a7a13378e02569fb80ab072', '1345210697'),
(141, 'jchen', 2, 'Jeremy', 'Chen', 'Jeremy Chen', 'jchen@gmail.com', '89769656af23d72f297ef35c824859ce', '1345210720'),
(142, 'jjenkins', 2, 'Jerome', 'Jenkins', 'Jerome Jenkins', 'jjenkins@gmail.com', '6a691d45d452802a0d38e22415cb3978', '1345210750'),
(143, 'mfuentes', 2, 'Amalia', 'Fuentes', 'Amalia Fuentes', 'mfuentes@gmail.com', '40cf6053fe34d4cfc2d493dbc6166a9a', '1345210778'),
(144, 'swen', 2, 'Sandy', 'Wen', 'Sandy Wen', 'swen@gmail.com', '2899dc4b713310fa140c05719216f3ec', '1345210796'),
(145, 'mwilcox', 2, 'Mandy', 'Wilcox', 'Mandy Wilcox', 'mwilcox@gmail.com', 'afa43aac428cb00fd5cf26b0acfc81a7', '1345210831'),
(146, 'jjones', 2, 'Janna', 'Jones', 'Janna Jones', 'jjones@gmail.com', '73fbcacc91ed9214099b53403c727284', '1345210860'),
(147, 'sericson', 1, 'Sam', 'Ericson', 'Sam Ericson', 'sericson@gmail.com', '33a1b2b934de6fc6074d6aa96beeb52d', '1345210894'),
(148, 'eellis', 1, 'Elia', 'Ellis', 'Elia Ellis', 'eelis@gmail.com', 'fc60245a5cc52a57083e28c5cb14b1ef', '1345210916'),
(149, 'rrosenthal', 1, 'Rebekah', 'Rosenthal', 'Rebekah Rosenthal', 'rrosenthal@gmail.com', 'c7b3198b59cf3d92eb26bb0990e37713', '1345210947'),
(150, 'hhorton', 1, 'Harry', 'Horton', 'Harry Horton', 'hhorton@gmail.com', '96c5bc65fadecbb2b4e492159be09c48', '1345210968'),
(151, 'lflorence', 1, 'Leah', 'Florence', 'Leah Florence', 'lflorence@gmail.com', 'd26d45b82b7bcd634a67b5364ad21a89', '1345211003'),
(152, 'rknox', 9, 'Rachel', 'Knox', 'Rachel Knox', 'rknox@gmail.com', '438e420676fada5a084b5adbcb2b9047', '1345211028'),
(153, 'dkhol', 2, 'Diane', 'Kohl', 'Diane Kohl', 'dkhol@yahoo.com', '1c51e6cbeaeddb00c36eeaac9892b471', '1345211061'),
(154, 'bstevens', 1, 'Bonnie', 'Stevens', 'Bonnie Stevens', 'bstevens@gmail.com', 'c2d2679ad33739efa900a248594e73d9', '1345211086'),
(155, 'rwilson', 1, 'Ruth', 'Wilson', 'Ruth Wilson', 'rwilson@gmail.com', 'd73b362a1798ceadc517bf999a758f7a', '1345211154'),
(156, 'wzapatero', 1, 'Wendy', 'Zapatero', 'Wendy Zapatero', 'wzapatero@gmail.com', '5539fb5af32382266532726d3a011eca', '1345211202'),
(157, 'ajohnston', 1, 'Ava', 'Johnston', 'Ava Johnston', 'ajohnston@gmail.com', 'dd65a08fa49e75c36e46cb231ba5517a', '1345211232'),
(158, 'abell', 2, 'Alexa', 'Bell', 'Alexa Bell', 'abell@gmail.com', '9d8bf0351e924c43a87fdb44b723de59', '1345219488'),
(159, 'nws_admin', 9, 'noelle', 'sweany', 'noelle sweany', 'noellesweany@gmail.com', '3d4fe7a00bc6fb52a91685d038733d6f', '1345224797'),
(160, 'saraha', 9, 'Sarah', 'A', 'Sarah A', 'saraha@gmail.com', '2d0f631129dfb6ffd981f9d021ed2b14', '1345656219'),
(161, 'ktothero', 1, 'Ken', 'Tothero', 'Ken Tothero', 'ktothero@austin.utexas.edu', 'f07733f0e55ee0352f170d810640447b', '1346955335'),
(162, 'david_stu', 1, 'David_Student', 'Kim', 'David_Student Kim', 'david.qwk@gmail.com', '96e79218965eb72c92a549dd5a330112', '1347389721'),
(163, 'sarah_teacher', 2, 'Sarah', 'Teacher', 'Sarah Teacher', 'sakhtar@austin.utexas.edu', 'c98fb0c72f476d49f6a3e1c358a94e89', '1348162987'),
(164, 'sarah_student', 1, 'Sarah', 'Student', 'Sarah Student', 'star272@live.com', 'c98fb0c72f476d49f6a3e1c358a94e89', '1348163055'),
(165, 'nws_teacher', 2, 'Noelle', 'Sweany', 'Noelle Sweany', 'noellesweany@gmail.com', '3d4fe7a00bc6fb52a91685d038733d6f', '1353987329'),
(166, 'roser_demo', 9, 'Roser', 'Demo', 'Roser Demo', 'david.kim@gmail.com', '96e79218965eb72c92a549dd5a330112', '1357338555'),
(167, 'nws_student', 1, 'Noelle', 'Student', 'Noelle Student', 'nsweany@austin.utexas.edu', '53ec947facf8a39c05e9e9d67dbe2f66', '1359042641'),
(168, 'cesar_student', 2, 'cesar', 'N', 'cesar N', 'ccnavarrete@utexas.edu', '96e79218965eb72c92a549dd5a330112', '1359562807'),
(169, 'jon_teacher', 1, 'Jon', 'Douu', 'Jon Douu', 'ccn@austin.utexas.edu', '96e79218965eb72c92a549dd5a330112', '1359563919'),
(170, 'david_teacher', 2, 'David_teacher', 'Kim', 'David_teacher Kim', 'david.teacher@teacher.com', '96e79218965eb72c92a549dd5a330112', '1359661536'),
(171, 'jane_student', 1, 'jane', 'S', 'jane S', 'ccn@mail.utexas.edu', '96e79218965eb72c92a549dd5a330112', '1360076428'),
(172, 'jan', 1, 'Jan', 'Tea', 'Jan Tea', 'seagaze1@gmail.com', '96e79218965eb72c92a549dd5a330112', '1361203688'),
(173, 'nroser', 9, 'Nancy', 'Roser', 'Nancy Roser', 'nlroser@utexas.edu', '4c7cbe70635a32e344495fa99f2b8ef8', '1361205450');

-- --------------------------------------------------------

--
-- Table structure for table `subcategory_tags`
--

CREATE TABLE IF NOT EXISTS `subcategory_tags` (
  `subtag_id` int(9) NOT NULL auto_increment,
  `main_id` int(9) NOT NULL,
  `subtag_title` varchar(256) NOT NULL,
  PRIMARY KEY  (`subtag_id`),
  UNIQUE KEY `subtag_id` (`subtag_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `subcategory_tags`
--

INSERT INTO `subcategory_tags` (`subtag_id`, `main_id`, `subtag_title`) VALUES
(1, 1, 'Producing an engaging opening/lead'),
(2, 1, 'Varying sentence length'),
(3, 2, 'Word choice'),
(4, 3, 'Lay-out'),
(5, 4, 'Letter-like forms'),
(6, 4, 'Directionality'),
(7, 1, 'Creating mood/tone'),
(8, 4, 'Invented/inventive spelling'),
(9, 1, 'Creating a logical structure'),
(10, 1, 'Incorporating voice'),
(11, 1, 'Building tension'),
(12, 2, 'Syntax'),
(13, 3, 'Font-size and change'),
(14, 2, 'Use of multiple languages, dialects, and/or register'),
(15, 1, 'Audience awareness'),
(16, 2, 'Language play'),
(17, 3, 'Spacing'),
(18, 4, 'Picture-print correspondence'),
(19, 1, 'Fresh, original language'),
(20, 1, 'Developing plot'),
(21, 3, 'Graphic features'),
(22, 1, 'Use of Dialogue'),
(23, 1, 'Contrast registers'),
(24, 5, 'Image to text relation'),
(25, 6, 'Test item'),
(26, 6, '1');

-- --------------------------------------------------------

--
-- Table structure for table `user_level`
--

CREATE TABLE IF NOT EXISTS `user_level` (
  `user_level` int(2) NOT NULL,
  `user_title` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_level`
--

INSERT INTO `user_level` (`user_level`, `user_title`) VALUES
(0, 'guest'),
(1, 'registered'),
(2, 'TA'),
(3, 'instructor'),
(4, 'admin'),
(99, 'super_admin');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
